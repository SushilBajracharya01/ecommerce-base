import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db/prisma";
import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";
import { env } from "./env";
import { mergeAnonymousCartIntoUserCart } from "./db/cart";

export const authOptions: NextAuthOptions = {
    // session: {
    //   strategy: 'jwt'
    // },
    pages: {
      signIn: "/login",
    },
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
      // {
      //   id: 'email',
      // type: 'email',
      // from: 'asdf@asdf.ca',
      // server: {},
      // maxAge: 24 * 60 * 60,
      // name: 'Email',
      // options: {},
      // sendVerificationRequest: sendVerificationRequest
      // },

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