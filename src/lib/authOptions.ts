import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db/prisma";
import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { Adapter } from "next-auth/adapters";
import { env } from "./env";
import { mergeAnonymousCartIntoUserCart } from "./db/cart";

export const authOptions: NextAuthOptions = {
    session: {
      strategy: 'jwt'
    },
    pages: {
      signIn: "/login",
    },
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        Google({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        }),
        // EmailProvider({
        //   server: {
        //     server: {
        //       host: env.EMAIL_SERVER_HOST,
        //       port: env.EMAIL_SERVER_PORT,
        //       auth: {
        //         user: env.EMAIL_SERVER_USER,
        //         pass: env.EMAIL_SERVER_PASSWORD
        //       }
        //     },
        //   },
        //   from: env.EMAIL_FROM,
        //   sendVerificationRequest({
        //     identifier: email,
        //     url,
        //     provider: {server, from},
        //   }) {
        //     console.log(email, url, server, from)
        //   }
        // })
    ], 
    callbacks: {
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