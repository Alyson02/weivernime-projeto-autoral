import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import FormValidation from "./FormValidations";
import { FormWrapper } from "./FormWrapper";
import { InputWrapper } from "./InputWrapper";
import TextArea from "../Form/TextArea";
import { FormHelperText, FormLabel, Typography } from "@mui/material";
import Button from "../Form/Button";
import styled from "styled-components";
import { Rating } from "@mui/material";
import CropEasy from "../Crop/CropEasy";
import jikanService from "../../services/jikan";
import Episode from "../Episode";
import imgbbService from "../../services/imgbb";
import analiseService from "../../services/analise";
import { useNavigate } from "react-router-dom";

export default function AnaliseForm({ animeId }) {
  const [loading, setLoading] = useState(false);
  const [openCrop, setOpenCrop] = useState(false);
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [changeText, setChangeText] = useState(false);
  const [anime, setAnime] = useState(null);
  const [rateEpisodes, setRateEpisodes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const anime = await jikanService.getAnimeById(animeId);
      setAnime(anime.data.data);

      if (anime.data) {
        const arrRateEmpty = [];

        for (let index = 1; index <= anime.data.data.episodes; index++) {
          arrRateEmpty.push({
            countEp: index,
            rate: 0,
          });
        }

        setRateEpisodes(arrRateEmpty);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { handleSubmit, handleChange, data, errors } = useForm({
    validations: FormValidation,

    onSubmit: async (data) => {
      setLoading(true);
      let base64String;
      const reader = new FileReader();
      reader.addEventListener("load", async () => {
        base64String = reader.result;

        const imageUrl = await imgbbService.uploadFile(base64String);

        const body = {
          animeId: Number(animeId),
          notaGeral: Number(data.notaGeral),
          notaAbertura: Number(data.notaAbertura),
          texto: data.texto,
          episodios: rateEpisodes,
          imageUrl: imageUrl,
          animeName: anime.title,
        };

        await analiseService.createAnalise(body);

        setLoading(false);

        navigate("/analises");
      });
      reader.readAsDataURL(file);
    },

    initialValues: {
      texto: "",
      notaGeral: 1,
      notaAbertura: 1,
    },
  });

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };

  if (loading) return <p>carregando</p>;

  return !openCrop ? (
    <FormWrapper onSubmit={handleSubmit}>
      <Title>
        Analisando <Title style={{ color: "#1565c0" }}>{anime?.title}</Title>
      </Title>

      <InputWrapper>
        <FormLabel error={!!errors.texto}>Texto</FormLabel>
        <TextArea
          name="texto"
          placeholder="O anime mais daora que já vi..."
          onChange={handleChange("texto")}
          value={data.texto || ""}
          variant="outlined"
          minRows={5}
          error={!!errors.texto}
        />
        {errors.texto && (
          <FormHelperText error={!!errors.texto}>{errors.texto}</FormHelperText>
        )}
      </InputWrapper>

      <TwoInputSpace>
        <div>
          <Typography component="legend">Nota geral</Typography>
          <Rating
            name="notaGeral"
            value={Number(data.notaGeral) || 0}
            onChange={handleChange("notaGeral")}
            defaultValue={1}
            precision={1}
            size="large"
            max={10}
          />
        </div>

        <div>
          <Typography component="legend">Nota da abertura</Typography>
          <Rating
            name="notaAbertura"
            value={Number(data.notaAbertura) || 0}
            onChange={handleChange("notaAbertura")}
            defaultValue={1}
            precision={1}
            size="large"
            max={10}
          />
        </div>
      </TwoInputSpace>

      <InputWrapper>
        <Typography>Capa da nalise</Typography>
        <UploadPhoto>
          {file ? (
            <>
              <UploadPhotoPreview
                src={photoURL}
                onMouseOver={() => setChangeText(true)}
                onMouseOut={() => setChangeText(false)}
                onClick={() => setFile(null)}
              />

              <TextChangePhoto changeText={changeText}>
                Trocar foto
              </TextChangePhoto>
            </>
          ) : (
            <UploadPhotoButtonWrapper>
              <label htmlFor="upload-photo-capa">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="upload-photo-capa"
                  name="upload-photo-capa"
                  type="file"
                  onChange={handleChangeImage}
                />
                <Button color="primary" variant="contained" component="span">
                  Upload
                </Button>
              </label>
            </UploadPhotoButtonWrapper>
          )}
        </UploadPhoto>
      </InputWrapper>

      <SubmitContainer>
        <Button type="submit" disabled={loading}>
          Publicar
        </Button>
      </SubmitContainer>

      <EpisodesWrapper>
        {rateEpisodes.map((re, i) => (
          <EpisodeWrapper key={re.countEp}>
            <Episode
              episode={re}
              rateEpisodes={rateEpisodes}
              setRateEpisodes={setRateEpisodes}
            />
          </EpisodeWrapper>
        ))}
      </EpisodesWrapper>
    </FormWrapper>
  ) : (
    <CropEasy
      {...{ photoURL, setOpenCrop, setPhotoURL, setFile, proporcao: 6 }}
    />
  );
}

const Title = styled.h1`
  font-size: 30px;
  font-family: "roboto";
  font-weight: bold;
  display: inline-block;
  margin-bottom: 20px;
`;

const TextChangePhoto = styled.div`
  opacity: ${({ changeText }) => (changeText ? "1" : "0")};
  transition: opacity 1s ease;
  position: absolute;
  top: 968px / 2;
  left: 968px / 2;
  color: white;
  pointer-events: none;
`;

const UploadPhoto = styled.div`
  padding: 20px;
  border: #1565c0 3px dotted;
  width: 100%;
  min-height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const UploadPhotoButtonWrapper = styled.div``;

const SubmitContainer = styled.div`
  margin-top: 40px !important;
  width: 100% !important;
  > button {
    margin-top: 0 !important;
  }
`;

const TwoInputSpace = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const UploadPhotoPreview = styled.img`
  width: 100%;
  cursor: pointer;
  &:hover {
    filter: brightness(70%);
    transition: all 1s ease;
  }
`;

const EpisodesWrapper = styled.ul`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 40px;
`;
const EpisodeWrapper = styled.li`
  margin-bottom: 20px;

  :last-child {
    margin-bottom: 0px;
  }
`;
