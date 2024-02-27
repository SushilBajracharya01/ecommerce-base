import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db/prisma";
import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
}