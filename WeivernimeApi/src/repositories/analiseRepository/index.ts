import { prisma } from "@/config";
import { Prisma, analise, analiseEp } from "@prisma/client";
import { sqltag } from '@prisma/client/runtime/library';

async function insert(analise: analise, episodes: Array<analiseEp>) {
    await prisma.analise.create({ data: { ...analise, episodios: { create: episodes } } });
}

async function getAnaliseByAnimeId(animeId: number, userId: number) {
    return await prisma.analise.findFirst({
        where: {
            animeId: animeId,
            userId: userId
        }
    });
}

async function list(skip: number, limit = 10, search: string, animeId: number): Promise<analise[]> {

    const where: any = {
        OR: [
            {
                user: {
                    name: {
                        contains: search,
                        mode: "insensitive"
                    }
                }
            },
            {
                texto: {
                    contains: search,
                    mode: "insensitive"
                }
            },
            {
                animeName: {
                    contains: search,
                    mode: "insensitive"
                }
            }
        ],
    };

    if (animeId !== undefined && animeId !== 0) {
        where.animeId = animeId;
    }

    return await prisma.analise.findMany({
        include: { user: true },
        take: limit,
        skip,
        where
    });
}

async function first(id: number) {

    return await prisma.analise.findFirst({
        where: {
            id
        }, include: {
            user: true,
            episodios: true,
            likes: true
        }
    });

}

async function registerLike(analiseId: number, userId: number, liked: boolean) {

    await prisma.likesAnalise.create({
        data: {
            analiseId, userId, liked
        }
    })

}

async function updateLike(analiseId: number, userId: number, liked: boolean, likedId: number) {

    await prisma.likesAnalise.update({
        data: {
            analiseId, userId, liked
        }, where: {
            id: likedId
        }
    })

}

async function getTop5Analises() {

    return await prisma.analise.findMany({
        take: 5,
        orderBy: {
            likes: {
                _count: "desc"
            }
        },
    })

}

async function get5AnimesMaisAvaliados() {

    const consulta = sqltag`
        select a."animeId", count("animeId") as c  from analise a group by "animeId" order by c desc
    `

    return await prisma.$queryRaw<Top5AnimesMaisAnalisados[]>(consulta);

}

type Top5AnimesMaisAnalisados = {
    animeId: number,
    c: number
}

export default {
    insert,
    getAnaliseByAnimeId,
    list,
    first,
    registerLike,
    updateLike,
    getTop5Analises,
    get5AnimesMaisAvaliados
}