import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import analiseService from "@/services/analise";
import styled from "styled-components";
import Loader from "@/components/Loader";
import defaultImage from "@/assets/images/defaultImage.png";
import aspas from "@/assets/images/aspas.png";
import Episode from "./components/Episodio";
import like from "@/assets/svg/like.svg";
import dislike from "@/assets/svg/dislike.svg";
import likeFill from "@/assets/svg/like-fill.svg";
import dislikeFill from "@/assets/svg/dislike-fill.svg";
import { UseAuth } from "@/contexts/Auth/useAuth";

export default function Analise() {
  const { analiseId } = useParams();
  const [analise, setAnalise] = useState(null);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDisLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disLiked, setDisLiked] = useState(false);

  const {user} = UseAuth();

  useEffect(() => {
    setLoading(true);
    const getAnalise = async () => {
      const analise = await analiseService.analiseById(analiseId, user?.user?.id);

      analise.data.episodios.sort((a, b) => a.countEp - b.countEp);

      setLikes(analise.data.likes.filter((l) => l.liked).length);
      setDisLikes(analise.data.likes.filter((l) => l.liked === false).length);

      setLiked(analise.data.liked);
      setDisLiked(analise.data.disliked);

      setAnalise(analise.data);
      setLoading(false);
    };

    getAnalise();
  }, [liked, disLiked]);

  if (loading) return <Loader />;

  console.log(analise);

  function calcularMediaEp() {
    let totalEp = 0;
    let sumEp = analise?.episodios?.length;

    if(sumEp === 0 || isNaN(sumEp)) sumEp = 1;

    analise?.episodios?.forEach((e) => {
      const rateDb = Number(e.rate);
      if (isNaN(rateDb)) return;
      totalEp += rateDb;
    });

    

    return (totalEp / sumEp).toFixed(1);
  }

  async function doLike() {
    if (liked) return;

    setLiked(true);
    setDisLiked(false);
    setLikes(likes + 1);
    setDisLikes(dislikes - 1);

    await analiseService.likeordislikeAnalise(analiseId, true);
  }

  async function doDisLike() {
    if (disLiked) return;

    setLiked(false);
    setDisLiked(true);
    setDisLikes(dislikes + 1);
    setLikes(likes - 1);

    await analiseService.likeordislikeAnalise(analiseId, false);
  }

  return (
    <Wrapper>
      <Imagem src={analise?.imageUrl ? analise?.imageUrl : defaultImage} />
      <LikeWrapper>
        <div>
          {liked ? (
            <Svg src={likeFill} onClick={doLike} />
          ) : (
            <Svg src={like} onClick={doLike} />
          )}
          <NumLikeDislike>{likes}</NumLikeDislike>
        </div>
        <div>
          {disLiked ? (
            <Svg src={dislikeFill} onClick={doDisLike} />
          ) : (
            <Svg src={dislike} onClick={doDisLike} />
          )}
          <NumLikeDislike>{dislikes}</NumLikeDislike>
        </div>
      </LikeWrapper>
      <Title>
        Analise de <SpanTitle color="#1565c0">{analise?.user?.name}</SpanTitle>{" "}
        sobre <SpanTitle color="#1565c0">{analise?.animeName}</SpanTitle>
      </Title>
      <Title>Notas</Title>
      <NotasWrapper>
        <div>
          <NotaText color={analise?.notaGeral > 5 ? "#1565c0" : "#FF0000"}>
            {analise?.notaGeral}
          </NotaText>
          <NotaText>GERAL</NotaText>
        </div>
        <div>
          <NotaText color={analise?.notaGeral > 5 ? "#1565c0" : "#FF0000"}>
            {analise?.notaGeral}
          </NotaText>
          <NotaText>ABERTURA</NotaText>
        </div>
        <div>
          <NotaText color={calcularMediaEp() > 5 ? "#1565c0" : "#FF0000"}>
            {calcularMediaEp()}
          </NotaText>
          <NotaText>MEDIA/EP</NotaText>
        </div>
      </NotasWrapper>
      <TextoWrapper>
        <Aspas src={aspas} />
        <Texto>{analise?.texto}</Texto>
      </TextoWrapper>
      <Title>Avaliação de espisódios</Title>
      <EpisodesWrapper>
        {analise?.episodios?.map((re) => (
          <EpisodeWrapper key={re.id}>
            <Episode episode={re} />
          </EpisodeWrapper>
        ))}
      </EpisodesWrapper>
    </Wrapper>
  );
}

const NotasWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media(max-width: 508px){
    flex-direction: column;
    gap: 40px;
  }
`;

const NotaText = styled.h1`
  text-align: center;
  color: ${({ color }) => (color ? color : "black")};
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
`;

const Imagem = styled.img`
  height: 162px;
  width: 100%;
  object-fit: cover;
  image-rendering: crisp-edges;
`;

const Title = styled.h1`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 15px;
  margin-top: 20px;

  @media(max-width: 508px){
    margin-top: 50px;
    font-size: 20px;
    line-height: 20px;
  }
`;

const SpanTitle = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 15px;
  margin-top: 20px;
  color: ${({ color }) => (color ? color : "black")};

  @media(max-width: 508px){
    margin-top: 50px;
    font-size: 20px;
    line-height: 20px;
  }
`;

const TextoWrapper = styled.div`
  margin-top: 20px;
  background: #d8d8d8;
  border-radius: 13px;
  width: 100%;
  padding: 5px 7px;
  position: relative;
`;

const Aspas = styled.img`
  transform: rotate(15deg);
  position: absolute;
  top: 5px;
  left: 7px;
  width: 65px;
  height: 65px;
`;

const Texto = styled.p`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 20px;
  margin-top: 90px;
  word-wrap: break-word;
`;

const Wrapper = styled.div`
  margin-bottom: 20px;
  position: relative;
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

const LikeWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  position: absolute;
  right: 0px;
  top: 161px;
`;

const Svg = styled.img`
  cursor: pointer;
`;

const NumLikeDislike = styled.p`
  text-align: center;
`;
