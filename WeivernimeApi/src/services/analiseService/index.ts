import { conflictError, notFoundError, unauthorizedError } from "@/errors";
import analiseRepository from "@/repositories/analiseRepository";
import { analise, analiseEp, likesAnalise, user } from "@prisma/client";
import userRepository from "@/repositories/userRepository";

async function create(body: analise & { episodios?: Array<analiseEp> }, userId: number) {

    body.userId = userId || 1;

    const analiseExiste = await analiseRepository.getAnaliseByAnimeId(Number(body.animeId), body.userId);
    if (analiseExiste) throw conflictError("Você já postou uma analise com esse anime")

    await analiseRepository.insert(body, body.episodios);

}

async function listAnalise(page: number, limit: number, search: string,  animeId: number) {

    if (isNaN(page)) page = undefined
    if (isNaN(limit)) limit = undefined

    const skip = limit * page - limit;

    const response = await analiseRepository.list(skip, limit, search, animeId);

    return response;
}

async function getAnalise(analiseId: number, userId: number): Promise<AnaliseModel> {

    const analise = await analiseRepository.first(analiseId);

    if (!analise) throw notFoundError();

    const liked = analise.likes.filter(x => x.userId === userId && x.liked === true).length > 0 ? true : false;
    const disliked = analise.likes.filter(x => x.userId === userId && x.liked === false).length > 0 ? true : false;

    return { ...analise, liked, disliked };

}

async function getTop5Analises(){
    return await analiseRepository.getTop5Analises();
}

type AnaliseModel = analise & {
    user: user;
    episodios: analiseEp[];
    likes: likesAnalise[];
    liked: boolean;
    disliked: boolean;
}

async function likeAnalise(analiseId: number, userId: number, liked: boolean) {

    const analise = await analiseRepository.first(analiseId);

    if (!analise) throw notFoundError();

    const user = await userRepository.getFirst(userId);

    if (!user) throw notFoundError();

    const userLiked = user.likes.filter(x => x.analiseId === analiseId && x.userId === userId)[0];

    if (!userLiked) { await analiseRepository.registerLike(analiseId, userId, liked); return; }

    await analiseRepository.updateLike(analiseId, userId, liked, userLiked.id)


}

async function get5AnimesMaisAvaliados(){

    return (await analiseRepository.get5AnimesMaisAvaliados()).map(x => x.animeId);

}

export default {
    create,
    listAnalise,
    getAnalise,
    likeAnalise,
    getTop5Analises,
    get5AnimesMaisAvaliados
}