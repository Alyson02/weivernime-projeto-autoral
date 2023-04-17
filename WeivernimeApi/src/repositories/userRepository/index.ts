import { prisma } from "@/config"
import { addPersonagemModel } from "@/schemas/userSchemas"
import { user } from "@prisma/client"

async function getFirst(id: number) {

    return await prisma.user.findFirst({
        where: {
            id
        },
        include: {
            likes: true
        }
    })

}

async function create(user: user) {

    await prisma.user.create({
        data: user
    })

}

async function getByEmail(email: string) {

    return await prisma.user.findFirst({
        where: {
            email
        }
    })

}

async function updatePicUser(user: user, imageUrl: string) {

    await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            email: user.email,
            foto: imageUrl,
            password: user.password,
            name: user.name
        }
    })

}

async function getUserById(id: number) {

    const likes = (await prisma.likesAnalise.aggregate({ _sum: { userId: true }, where: { analise: { userId: id } } }))._sum.userId;
    const dislikes = (await prisma.likesAnalise.aggregate({ _sum: { userId: true }, where: { AND: { analise: { userId: id }, liked: false } } }))._sum.userId

    const user = await prisma.user.findFirst({
        where: {
            id
        },
        include: {
            analises: true,
            personagens: true,
        }
    })

    return { likes, dislikes, user }
}

async function addPersonagem(personagem: addPersonagemModel, userId: number) {

    await prisma.personagensUser.create({
        data: {
            nome: personagem.name,
            foto: personagem.foto,
            userId
        }
    })

}

export default {
    getFirst,
    create,
    getByEmail,
    updatePicUser,
    getUserById,
    addPersonagem
}