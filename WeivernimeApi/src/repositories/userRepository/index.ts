import { prisma } from "@/config"

async function getFirst(id: number) {

    return await prisma.user.findFirst({
        where: {
            id
        },
        include:{
            likes: true
        }
    })

}

export default {
    getFirst
}