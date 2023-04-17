import * as jwt from "jsonwebtoken";
import { user } from "@prisma/client";

import { prisma, redisServer } from "@/config";
import { createUser } from "./factories/user";

export async function cleanDb() {
    await prisma.likesAnalise.deleteMany({});
    await prisma.analiseEp.deleteMany({});
    await prisma.analise.deleteMany({});
    await prisma.personagensUser.deleteMany({});
    await prisma.user.deleteMany({});
}

export async function generateValidToken(user?: user) {
    const incomingUser = user || (await createUser());
    const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);
    return token;
}