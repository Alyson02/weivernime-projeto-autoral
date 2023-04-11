import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { animesMaisAvaliados, createAnalise, getAnalise, likeOrDislike, listAnalise, top5 } from "@/controllers";
import { createAnaliseSchema, likeAnaliseSchema } from "@/schemas"

const analiseRouter = Router();

analiseRouter.post("/", validateBody(createAnaliseSchema), createAnalise);
analiseRouter.get("/", listAnalise);
analiseRouter.get("/:analiseId", getAnalise)
analiseRouter.get("/dados/top5", top5)
analiseRouter.get("/dados/top5/anime", animesMaisAvaliados)
analiseRouter.post("/:analiseId/likeordislike", /*authenticateToken,*/ validateBody(likeAnaliseSchema), likeOrDislike)

export {
    analiseRouter
}