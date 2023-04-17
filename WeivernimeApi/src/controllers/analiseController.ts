import { AuthenticatedRequest, handleApplicationErrors } from "@/middlewares";
import analiseService from "@/services/analiseService";
import { analise, analiseEp } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

async function createAnalise(req: AuthenticatedRequest<{}, {}, analise & { episodios?: Array<analiseEp> }>, res: Response, next: NextFunction) {

    const body = req.body;

    body.episodios.forEach(x => x.rate = Number(x.rate))

    await analiseService.create(body, req.userId);
    return res.sendStatus(httpStatus.CREATED);

}

async function listAnalise(req: Request, res: Response) {

    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const search = req.query.search as string || "";
    const animeId: number = Number(req.query.animeId || 0);

    var analises = await analiseService.listAnalise(page, limit, search, animeId)

    return res.send(analises)

}

async function getAnalise(req: Request, res: Response) {

    const analiseId = Number(req.params.analiseId);
    const userId = Number(req.query.userId);

    const analise = await analiseService.getAnalise(analiseId, userId);

    return res.send(analise)

}

async function likeOrDislike(req: AuthenticatedRequest, res: Response) {

    const userId = req.userId || 1
    const analiseId = Number(req.params.analiseId);
    const liked: boolean = req.body.liked;

    await analiseService.likeAnalise(analiseId, userId, liked)

    return res.sendStatus(httpStatus.OK)

}

async function top5(req: Request, res: Response) {

    const top5 = await analiseService.getTop5Analises();

    return res.send(top5)

}

async function animesMaisAvaliados(req: Request, res: Response) {

    const top5animes = await analiseService.get5AnimesMaisAvaliados()

    return res.send(top5animes)

}

export default {
    animesMaisAvaliados,
    top5,
    likeOrDislike,
    getAnalise,
    listAnalise,
    createAnalise
}