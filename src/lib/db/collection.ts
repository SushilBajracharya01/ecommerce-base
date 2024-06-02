import { getServerSession } from "next-auth";
import { authOptions } from "../authOptions";
import { prisma } from "./prisma";
import { Collections } from "@prisma/client";

export async function getCollections(): Promise<Collections[] | null> {
    const session = await getServerSession(authOptions);
    let collections: Collections[] | null = null;
    if(session) {
        collections = await prisma.collections.findMany({})
        return collections
    }
    return [];
}