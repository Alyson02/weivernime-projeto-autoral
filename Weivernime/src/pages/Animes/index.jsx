import styled from "styled-components";
import Button from "../../components/Form/Button";
import naruto from "../../assets/images/naruto.png";
import { useContext, useEffect, useRef, useState } from "react";
import jikanService from "@/services/jikan";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@/components/Loader";
import { EndMessage } from "@/components/EndMessage";
import SearchContext from "@/contexts/SearchContext";
import { useNavigate } from "react-router-dom";

export default function Animes() {
  const [animes, setanimes] = useState([]);
  const [page, setPage] = useState(1);
  const [noMore, setNoMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const { search } = useContext(SearchContext);
  const [searchCleanup, setSearchCleanup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const consultaranimes = async () => {
      const animes = await jikanService.listanimes(search, page, 10);
      if (animes.length > 0) {
        setanimes(animes);
        setLoading(false);
        setPage(page + 1);
      }
    };

    consultaranimes();
  }, [searchCleanup]);

  const isMountedRef = useRef(false);

  useEffect(() => {
    if (isMountedRef.current) {
      setPage(1);
      setSearchCleanup(!searchCleanup);
    } else {
      isMountedRef.current = true;
    }
  }, [search]);

  async function fetchData() {
    const animesServer = await jikanService.listanimes(search, page, 10);
    setanimes([...animes, ...animesServer]);

    if (animesServer.length === 0 || animesServer.length < 10) setNoMore(false);
    setPage(page + 1);
  }

  if(loading) return <Loader/>

  return (
    <Wrapper>
      <Title>Selecione um anime para analisar</Title>

      <InfiniteScroll
        dataLength={animes.length}
        next={fetchData}
        hasMore={noMore}
        loader={<Loader />}
        style={{ width: "100%" }}
        endMessage={<EndMessage>Final</EndMessage>}
      >
        <AnimesWrapper>
          {animes.map((anime) => {
            return (
              <Anime
                key={anime.mal_id}
                onClick={() => navigate(`/createAnalise/${anime.mal_id}`)}
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
      </InfiniteScroll>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-family: "roboto";
  font-weight: bold;
  display: inline-block;
  margin-bottom: 20px;
`;

const AnimesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 0;
  grid-row-gap: 20px;
  margin: 0;
  max-width: 969px;
  margin-top: 20px;
  justify-items: center; /* Alinha verticalmente */
  grid-auto-flow: dense;

  @media screen and (max-width: 850px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Anime = styled.div`
  width: 200px;
  max-height: 345px;
  cursor: pointer;
`;

const Imagemanime = styled.div`
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
