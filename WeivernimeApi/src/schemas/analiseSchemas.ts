import { analise, analiseEp } from "@prisma/client";
import Joi from "joi";

export const createAnaliseSchema = Joi.object<analise & { episodios: Array<analiseEp> }>({
    animeId: Joi.number().required(),
    notaAbertura: Joi.number().required().max(10).min(0),
    notaGeral: Joi.number().required().max(10).min(0),
    texto: Joi.string().required().min(20),
    episodios: Joi.array().optional(),
    imageUrl: Joi.string().uri().required(),
    animeName: Joi.string().required()
})

export const likeAnaliseSchema = Joi.object<{ liked: boolean }>({
    liked: Joi.bool().required()
})