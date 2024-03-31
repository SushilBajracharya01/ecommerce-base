import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db/prisma";
import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import { env } from "./env";
import { mergeAnonymousCartIntoUserCart } from "./db/cart";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

export const authOptions: NextAuthOptions = {
    // session: {
    //   strategy: 'jwt',
    //   maxAge: 1 * 24 * 60 * 60,
    // },
    // jwt:{

    // },
    pages: {
      signIn: "/login",
      newUser: '/register' 
    },
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
      Credentials({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          if(!credentials) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email
            }
          })

          if (user) {
            const isPasswordCorrect =await  bcrypt.compare(credentials.password, user.password || "")
            console.log(isPasswordCorrect, 'isPasswordCorrect', user, 'login');
            if(isPasswordCorrect) {
              return {id: user.id, email: user.email, name: user.name, image: user.image};
            }
            else{
              throw new Error('Invalid credentials')
            }          
          } else {
            throw new Error('Invalid credentials')
          }
        }
      }),
      Google({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
            profile(profile) {
              return {
                ...profile,
                id: profile.sub,
              }
            }
        }),
    ], 
    callbacks: {
      async jwt({ token, user }) {
        return token;
      },
      session({ session, user }) {
        if (session.user) {
          session.user.id = user.id;
        }
        return session;
      },
    },
    events: {
      async signIn({ user }) {
        await mergeAnonymousCartIntoUserCart(user.id);
      },
    },
}