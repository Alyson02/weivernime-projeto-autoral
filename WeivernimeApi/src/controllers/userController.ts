import { AuthenticatedRequest } from "@/middlewares";
import { addPersonagemModel, signinModel, signupModel } from "@/schemas/userSchemas";
import userService from "@/services/userService";
import { Request, Response } from "express";
import httpStatus from "http-status";

async function signin(req: Request<{}, {}, signinModel>, res: Response) {

    const userAndToken = await userService.signin(req.body);
    return res.send(userAndToken)

}

async function signup(req: Request<{}, {}, signupModel>, res: Response) {

    await userService.signup(req.body);
    return res.sendStatus(httpStatus.CREATED);

}

async function changePic(req: AuthenticatedRequest, res: Response) {

    const imageUrl = req.body.imageUrl as string;
    await userService.changePic(imageUrl, req.userId);
    return res.sendStatus(httpStatus.OK);

}

async function get(req: Request, res: Response) {

    const userId = Number(req.params.userId);

    if (isNaN(userId)) return res.sendStatus(httpStatus.BAD_REQUEST)

    const user = await userService.get(userId);

    return res.send(user);

}

async function addPersonagem(req: AuthenticatedRequest<{}, {}, addPersonagemModel>, res: Response) {

    await userService.addPersonagem(req.userId, req.body);
    return res.send({ message: "Adicionado" })

}

export default {
    signin,
    signup,
    changePic,
    get,
    addPersonagem
}