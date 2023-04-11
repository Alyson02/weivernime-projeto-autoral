import axios from "axios";
const URL_BASE = import.meta.env.VITE_JIKAN_BASE_URL;
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

async function getAnimeById(animeId) {
  try {
    const anime = await axios.get(`${URL_BASE}/anime/${animeId}`);
    return anime;
  } catch (error) {
    return null;
  }
}

async function listanimes(search, page, limit = 10) {
  try {
    const animes = await axios.get(`${proxyUrl}${URL_BASE}/anime`, { params: {
        q: search,
        page,
        limit
    } });

    console.log(animes)

    return animes.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default {
  getAnimeById,
  listanimes
};
