import Joi from "joi";

export type signinModel = {
    email: string,
    password: string
}

export const signinSchema = Joi.object<signinModel>({
    email: Joi.string().required().email(),
    password: Joi.string().required()
});

export type signupModel = {
    email: string,
    password: string,
    username: string
}

export const signupSchema = Joi.object<signupModel>({
    email: Joi.string().required().email(),
    password: Joi.string().required().max(40),
    username: Joi.string().required().max(20)
})

export const UpdateUserPic = Joi.object<updateUserPicModel>({
    imageUrl: Joi.string().required()
});

export type updateUserPicModel = {
    imageUrl: string
}

export const addPersonagemSchema = Joi.object<addPersonagemModel>({

    name: Joi.string().required(),
    foto: Joi.string().required().uri()

});

export type addPersonagemModel = {
    name: string,
    foto: string
}