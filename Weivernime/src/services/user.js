import api from "./api";

export function setUserLocalStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem("user");

  if (!json) {
    return null;
  }

  const user = JSON.parse(json);
  return user ?? null;
}

export async function LoginRequest(body) {
  const request = await api.post("/signin", body);
  return request.data;
}

export async function SignupRequest(user) {
  const request = await api.post("/signup", user);
  return request;
}

export async function UpdatePic(imageUrl) {
  await api.post("/changePic", { imageUrl });
  const userStorage = getUserLocalStorage();
  userStorage.user.foto = imageUrl;
  setUserLocalStorage(userStorage);
}

export async function GetUserById(userId) {
  const user = await api.get("/user/" + userId);
  return user;
}

export async function AddPersonagemApi(personagem) {
  await api.post("/user/addPersonagem", personagem);
}
