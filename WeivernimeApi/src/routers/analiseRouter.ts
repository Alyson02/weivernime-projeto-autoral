import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import controler from "@/controllers/analiseController";
import { createAnaliseSchema, likeAnaliseSchema } from "@/schemas"

const analiseRouter = Router();

analiseRouter.post("/", authenticateToken, validateBody(createAnaliseSchema), controler.createAnalise);
analiseRouter.get("/", controler.listAnalise);
analiseRouter.get("/:analiseId", controler.getAnalise)
analiseRouter.get("/dados/top5", controler.top5)
analiseRouter.get("/dados/top5/anime", controler.animesMaisAvaliados)
analiseRouter.post("/:analiseId/likeordislike", authenticateToken, validateBody(likeAnaliseSchema), controler.likeOrDislike)

export {
    analiseRouter
}