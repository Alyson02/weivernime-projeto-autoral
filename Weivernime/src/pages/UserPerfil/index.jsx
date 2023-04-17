import { useParams } from "react-router-dom";
import styled from "styled-components";
import defaultImage from "@/assets/images/defaultImage.png";
import { useEffect, useState } from "react";
import { useUserPhotoContext } from "@/contexts/UserPhoto/useUserPhoto";
import { UseAuth } from "@/contexts/Auth/useAuth";
import LetteredAvatar from "react-lettered-avatar";
import defaultPic from "@/assets/images/naruto2.png";
import { NatureOutlined } from "@mui/icons-material";
import { MdAdd } from "react-icons/md";
import { Box, Modal, Typography } from "@mui/material";
import Form from "./components/Form";
import { GetUserById } from "@/services/user";
import jikanService from "@/services/jikan";
import Scrollbars from "react-custom-scrollbars";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UserPerfil() {
  const [personagens, setPersonagens] = useState([]);

  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [analises, setAnalises] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const userDb = await GetUserById(userId);
      setUser(userDb.data.user);
      setPersonagens(userDb.data.user.personagens);
      setLikes(userDb.data.likes);
      setDislikes(userDb.data.dislikes);

      const analises = userDb.data.user.analises;

      const analiseWithAnime = [];

      for (const analise of analises) {
        const anime = (await jikanService.getAnimeById(analise.animeId)).data
          .data;

        analiseWithAnime.push({
          ...analise,
          thumb: anime?.images?.jpg?.image_url,
        });
      }

      setAnalises(analiseWithAnime);
    };

    getUser();
  }, []);

  const auth = UseAuth();

  const [isOwner, setIsOwner] = useState();

  useEffect(() => {
    console.log(auth?.user?.user?.id, user?.id);
    setIsOwner(auth?.user?.user?.id === user?.id);
  }, [userId, user]);

  const { photoURL, setPhotoURL, setFile, setOpenCrop } = useUserPhotoContext();

  const [changeText, setChangeText] = useState(false);

  const [modalIsOpen, setIsOpen] = useState(false);

  const handleChangeImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setPhotoURL(URL.createObjectURL(file));
      setOpenCrop(true);
    }
  };

  const handleLabelClick = (event) => {
    if (isOwner) {
      const input = document.getElementById("upload-photo-perfil");
      input.click();
    } else {
      event.preventDefault();
    }
  };

  function addPersonagem(personagem) {
    setPersonagens([...personagens, personagem]);

    setIsOpen(false);
  }

  const renderThumbHorizontal = ({ style, ...props }) => {
    const thumbStyle = {
      backgroundColor: "#bbb",
      borderRadius: "4px",
      cursor: "pointer",
    };

    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  };

  return (
    <div style={{ paddingBottom: "20px" }}>
      <Capa image={defaultImage}>
        <CapaInfos>
          <CapaInfoText>{user?.name}</CapaInfoText>
          <CapaInfoText>level {user?.level}</CapaInfoText>
        </CapaInfos>
        <UserPhotoWrapper>
          {isOwner && (
            <TextChangePhoto changeText={changeText}>ALTERAR</TextChangePhoto>
          )}
          <label
            htmlFor="upload-photo-perfil"
            onClick={handleLabelClick}
            style={{ cursor: "pointer" }}
          >
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="upload-photo-perfil"
              name="upload-photo-perfil"
              type="file"
              onChange={handleChangeImage}
            />
            {user?.foto ? (
              <Pic
                isOwner={isOwner}
                src={photoURL ? photoURL : user?.foto}
                onMouseOver={() => setChangeText(true)}
                onMouseOut={() => setChangeText(false)}
              />
            ) : (
              <CustomLetteredAvatar
                isOwner={isOwner}
                onMouseOver={() => setChangeText(true)}
                onMouseOut={() => setChangeText(false)}
                name={user?.name}
                size={100}
                backgroundColor="#1565c0"
              />
            )}
          </label>
        </UserPhotoWrapper>
      </Capa>
      <TitleSection>Personagens preferidos</TitleSection>
      <SectionPersonagenAndRelatorio>
        <PersonagemWrapper>
          {personagens.map((personagem) => (
            <Personagem>
              <PersonagemPhoto src={personagem.foto} />
              <PersonagemNome>{personagem.nome}</PersonagemNome>
            </Personagem>
          ))}

          {personagens.length < 4 && isOwner && (
            <AddPersonagem onClick={() => setIsOpen(true)}>
              <MdAdd color="#1565c0" size={20} />
            </AddPersonagem>
          )}
        </PersonagemWrapper>
        <ContadorWrapper>
          <Contador cor="#1b4332">
            <ContadorNumero>{likes || 0}</ContadorNumero>
            <ContadorNome>likes</ContadorNome>
          </Contador>
          <Contador cor="#fb8500">
            <ContadorNumero>{dislikes || 0}</ContadorNumero>
            <ContadorNome>dislikes</ContadorNome>
          </Contador>
        </ContadorWrapper>
      </SectionPersonagenAndRelatorio>
      <TitleSection style={{ marginTop: "40px" }}>
        Animes analisados
      </TitleSection>
      <Scrollbars
        style={{ width: "100%", height: "340px" }}
        renderThumbHorizontal={renderThumbHorizontal}
        universal
      >
        <AnalisesWrapper>
          {analises.map((analise) => (
            <Analise onClick={() => navigate(`/analise/${analise?.id}`)}>
              <ImagemAnalise imagem={analise?.thumb}>
                <AnimeNameWrapper>
                  <AnimeName>{analise?.animeName}</AnimeName>
                </AnimeNameWrapper>
              </ImagemAnalise>
            </Analise>
          ))}
        </AnalisesWrapper>
      </Scrollbars>
      <Modal
        open={modalIsOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="body1">Informacoes do personagem</Typography>
          <Form addPersonagem={addPersonagem} />
        </Box>
      </Modal>
    </div>
  );
}

const AnalisesWrapper = styled.div`
  display: flex;
  gap: 14px;
  width: 100%;
  margin-top: 20px;
`;

const Analise = styled.div`
  min-width: 200px;
  max-width: 200px;
  max-height: 345px;
  cursor: pointer;
`;

const ImagemAnalise = styled.div`
  background-image: url(${({ imagem }) => (imagem ? imagem : naruto)});
  background-size: cover;
  width: 100%;
  height: 300px;
  position: relative;
`;

const AnimeNameWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.51);
  height: 49px;
`;

const AnimeName = styled.p`
  width: 100%;
  color: #ffffff;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 15px;
  text-align: center;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
`;

const ContadorNome = styled.p`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;

  color: #ffffff;
`;

const ContadorNumero = styled.p`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 40px;
  line-height: 46px;
  color: #ffffff;
`;

const Contador = styled.div`
  width: 200px;
  height: 98px;

  background: ${({ cor }) => cor || "#0078cf"};
  border-radius: 4px;
  padding: 12px 6px;
`;

const ContadorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;

  @media (max-width: 720px) {
    justify-content: start;
  }
`;

const AddPersonagem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 3px solid #0078cf;
  border-radius: 50px;
  cursor: pointer;
`;

const PersonagemNome = styled.p`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #000000;
`;

const PersonagemPhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  object-fit: cover;
  image-rendering: crisp-edges;
`;

const Personagem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
`;

const PersonagemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
`;

const SectionPersonagenAndRelatorio = styled.section`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 720px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const TitleSection = styled.h1`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 15px;
  margin-top: 90px;
`;

const UserPhotoWrapper = styled.div`
  position: absolute;
  border-radius: 50px;
  bottom: -50px;
  left: 50%;
  margin-left: -50px;
`;

const CustomLetteredAvatar = styled(LetteredAvatar)`
  ${({ isOwner }) =>
    isOwner &&
    `&:hover {
    filter: brightness(70%) !important;
    transition: all 1s ease !important;
  }`}
`;

const TextChangePhoto = styled.div`
  opacity: ${({ changeText }) => (changeText ? "1" : "0")};
  transition: opacity 1s ease;
  position: absolute;
  font-size: 12px;
  width: 50px;
  height: 12px;
  top: 50%;
  margin-top: -6px;
  left: 50%;
  margin-left: -25px;

  color: white;
  pointer-events: none;
  z-index: 20;
`;

const Pic = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;

  ${({ isOwner }) =>
    isOwner &&
    `&:hover {
    filter: brightness(70%);
    transition: all 1s ease;
  }`}

  object-fit: cover;
  image-rendering: crisp-edges;
  cursor: pointer;
`;

const CapaInfoText = styled.p`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;

  color: #ffffff;
`;

const CapaInfos = styled.div`
  height: 56px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.51);
`;

const Capa = styled.div`
  height: 162px;
  width: 100%;
  object-fit: cover;
  image-rendering: crisp-edges;
  position: relative;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-repeat: no-repeat;
  background-color: red;
`;
