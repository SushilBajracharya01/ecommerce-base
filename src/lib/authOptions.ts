import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db/prisma";
import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import { env } from "./env";
import { mergeAnonymousCartIntoUserCart } from "./db/cart";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    // session: {
    //   strategy: 'jwt'
    // },
    pages: {
      signIn: "/login",
      newUser: '/register' 
    },
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
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
        // if(user) token.role  = user.role;
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