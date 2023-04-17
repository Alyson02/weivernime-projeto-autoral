import { conflictError, notFoundError, unauthorizedError } from "@/errors";
import { invalidCredentialsError } from "@/errors/invalidCredentialsError";
import userRepository from "@/repositories/userRepository";
import { addPersonagemModel, signinModel, signupModel } from "@/schemas/userSchemas";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

async function signin(body: signinModel) {

    const user = await userRepository.getByEmail(body.email);
    if (!user) throw invalidCredentialsError();

    const passwordIsValid = await bcrypt.compare(body.password, user.password);
    if (!passwordIsValid) throw invalidCredentialsError();

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    user.password = "";

    return { token, user }
}

async function signup(body: signupModel) {

    const user = await userRepository.getByEmail(body.email);
    if (user) throw conflictError("já existe um usuario com esse email");

    const hashedPassword = await bcrypt.hash(body.password, 12);

    await userRepository.create({
        password: hashedPassword,
        name: body.username,
        email: body.email,
        foto: "",
        backgroundUrl: "",
        level: 0,
        id: undefined
    });

}

async function changePic(imageUrl: string, userId: number) {

    const user = await userRepository.getFirst(userId);

    await userRepository.updatePicUser(user, imageUrl);

}

async function get(userId: number) {

    const user = await userRepository.getUserById(userId);

    if (!user.user) throw notFoundError();

    return user;

}

async function addPersonagem(userId: number, personagem: addPersonagemModel) {

    await userRepository.addPersonagem(personagem, userId);

}

export default {
    signin,
    signup,
    changePic,
    get,
    addPersonagem
}