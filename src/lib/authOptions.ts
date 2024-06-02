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
    session: {
      strategy: 'jwt',
    },
    pages: {
      signIn: "/login",
      newUser: '/register' 
    },
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
      Credentials({
        name: "Credentials",
        credentials: {},
        async authorize(credentials, req) {
          const {email, password } = credentials as {
            email: string;
            password: string;
          };
          if(!credentials) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: {
              email: email
            }
          })

          if (user) {
            const isPasswordCorrect = await  bcrypt.compare(password, user.password || "")
            if(isPasswordCorrect) {
              return {id: user.id, email: user.email, name: user.name, image: user.image};
            }
            else{
              throw new Error('Email or password does not match')
            }          
          } else {
            throw new Error('Email or password does not match')
          }
        }
      }),
    ], 
    callbacks: {
      async jwt({ token, user }) {
        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user.id = token.sub || "";
          session.user.name = token.name;
          session.user.email = token.email;
          session.user.image = token.picture;
        }
        return session;
      }
    },
    events: {
      async signIn({ user }) {
        await mergeAnonymousCartIntoUserCart(user.id);
      },
    },
}