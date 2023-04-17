import userController from "@/controllers/userController";
import { authenticateToken, validateBody } from "@/middlewares";
import { addPersonagemSchema, signinSchema, signupSchema, UpdateUserPic } from "@/schemas/userSchemas";
import { Router } from "express";

const userRouter = Router()

userRouter.post("/signin", validateBody(signinSchema), userController.signin);
userRouter.post("/signup", validateBody(signupSchema), userController.signup);
userRouter.post("/changePic", authenticateToken, validateBody(UpdateUserPic), userController.changePic)
userRouter.get("/user/:userId", userController.get)
userRouter.post("/user/addPersonagem", authenticateToken, validateBody(addPersonagemSchema), userController.addPersonagem)


export {
    userRouter
}