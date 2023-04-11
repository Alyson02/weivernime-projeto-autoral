import axios from "axios";

const API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
const BASE_URL = import.meta.env.VITE_IMGBB_BASE_URL;

async function uploadFile(base64String) {
  try {

    base64String = base64String.replace("data:image/jpeg;base64,", "")

    const res = await axios.post(
      `${BASE_URL}/1/upload?key=${API_KEY}`,
      {
        image: base64String,
      },    
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    return res.data.data.url;
  } catch (error) {
    return null;
  }
}

export default {
  uploadFile,
};
