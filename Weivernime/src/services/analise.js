import axios from "axios";
import api from "./api";
import jikanService from "./jikan";

async function createAnalise(body) {
  try {
    const response = await api.post("/analise", body);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function listAnalises(search, page, limit = 10, animeId) {
  try {
    const response = (
      await api.get("/analise", { params: { search, page, limit, animeId } })
    ).data;

    const analiseWithAnime = [];

    for (const analise of response) {
      const anime = (await jikanService.getAnimeById(analise.animeId)).data
        .data;

      analiseWithAnime.push({
        ...analise,
        thumb: anime?.images?.jpg?.image_url,
      });
    }

    return analiseWithAnime;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function analiseById(id) {
  try {
    const response = await api.get(`/analise/${id}`);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function likeordislikeAnalise(analiseId, liked) {
  try {
    await api.post(`/analise/${analiseId}/likeordislike`, { liked });
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function top5() {
  try {
    return (await api.get(`/analise/dados/top5`)).data;
  } catch (error) {
    return error;
  }
}

async function top5animes() {
  try {
    return (await api.get(`/analise/dados/top5/anime`)).data;
  } catch (error) {
    return error;
  }
}

export default {
  createAnalise,
  listAnalises,
  analiseById,
  likeordislikeAnalise,
  top5,
  top5animes
};
