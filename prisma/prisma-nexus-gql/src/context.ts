import { PrismaClient } from "@prisma/client";

/**
 * @description Prisma client
 * Use it to fetch request on database
 */
const prisma = new PrismaClient();

export interface Context {
    prisma: PrismaClient;
}

export function createContext(): Context {
    return { prisma };
}