import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import { useEffect, useState } from "react";
import jikanService from "@/services/jikan";
import analiseService from "@/services/analise";
import { useNavigate } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";

export default function Home() {
  const [animes, setAnimes] = useState([]);
  const [analises, setAnalises] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const analises = await analiseService.top5();
      setAnalises(analises);

      const animesId = await analiseService.top5animes();

      const animes = [];

      for (const animeId of animesId) {
        const anime = (await jikanService.getAnimeById(animeId)).data.data;
        animes.push(anime);
      }

      setAnimes(animes);
    };

    fetchData();
  }, []);

  return (
    <div>
      <Carousel showIndicators={false} showThumbs={false} showStatus={false} style={{ touchAction: "none"}}>
        {analises.map((analise) => {
          return (
            <CarouselItemWrapper
              onClick={() => navigate(`/analise/${analise.id}`)}
              key={analise.id}
            >
              <CarouselImage src={analise.imageUrl} />
              <TextoInicial
                style={{ backgroundColor: "red" }}
                className="legend"
              >
                {analise.texto.length > 77
                  ? analise.texto.slice(0, 77) + "..."
                  : analise.texto}
              </TextoInicial>
            </CarouselItemWrapper>
          );
        })}
      </Carousel>
      <AnimesSection>
        <Title>Animes mais avaliados</Title>
        <Scrollbars style={{ width: "100%", height: "140px" }} hidden="">
          <AnimesWrapper>
            {animes.map((anime) => {
              return (
                <Anime
                  key={anime.mal_id}
                  onClick={() =>
                    navigate(`/analises`, { state: { animeId: anime.mal_id } })
                  }
                >
                  <Imagemanime imagem={anime.images.jpg.image_url}>
                    <AnimeNameWrapper>
                      <AnimeName>
                        {anime.title.slice(0, 20)}
                        {anime.title.length > 20 ? "..." : ""}
                      </AnimeName>
                    </AnimeNameWrapper>
                  </Imagemanime>
                </Anime>
              );
            })}
          </AnimesWrapper>
        </Scrollbars>
      </AnimesSection>
    </div>
  );
}

const AnimesSection = styled.section`
  @media (max-width: 570px) {
    padding: 0 10px;
  }
`;

const CarouselItemWrapper = styled.div`
  position: relative;
  cursor: pointer;
  height: 279px;
`;

const TextoInicial = styled.div`
  left: 0px !important;
  bottom: 0px !important;

  margin: 0px !important;

  width: 100% !important;

  opacity: 1 !important;

  background: rgba(0, 0, 0, 0.51) !important;

  border-radius: 0 !important;
  height: 77px !important;

  display: flex !important;
  align-items: center !important;

  font-family: "Roboto" !important;
  font-style: normal !important;
  font-weight: 800 !important;
  font-size: 24px !important;
  line-height: 15px !important;
`;

const CarouselImage = styled.img`
  height: 100%;
  object-fit: cover;
`;

const Title = styled.h1`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 15px;
  margin-top: 20px;
`;

const AnimesWrapper = styled.div`
  display: flex;
  max-width: 968px;
  margin-top: 20px;

  /* @media (max-width: 570px) {
    overflow: scroll;
    overflow-y: hidden;
  } */
`;

const Anime = styled.div`
  width: 20%;
  max-height: 108px;
  cursor: pointer;

  @media (max-width: 570px) {
    min-width: 193px;
  }
`;

const Imagemanime = styled.div`
  background-image: url(${({ imagem }) => (imagem ? imagem : naruto)});
  background-size: cover;
  width: 100%;
  height: 108px;
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
