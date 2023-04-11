import styled from "styled-components";
import Button from "../../components/Form/Button";
import naruto from "../../assets/images/naruto.png";
import { useContext, useEffect, useRef, useState } from "react";
import analiseService from "@/services/analise";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@/components/Loader";
import { EndMessage } from "@/components/EndMessage";
import SearchContext from "@/contexts/SearchContext";
import { useLocation, useNavigate } from "react-router-dom";
import analise from "@/services/analise";

export default function Analises() {
  const [analises, setAnalises] = useState([]);
  const [page, setPage] = useState(1);
  const [noMore, setNoMore] = useState(true);
  let animeId = 0;
  const [loading, setLoading] = useState(false);

  const { search } = useContext(SearchContext);
  const [searchCleanup, setSearchCleanup] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();
  animeId = location.state?.animeId;

  useEffect(() => {
    setLoading(true);
    const consultarAnalises = async () => {
      const analises = await analiseService.listAnalises(
        search,
        page,
        10,
        animeId
      );
      setAnalises(analises);
      if (analises.length < 1) setNoMore(false);

      setLoading(false);
      setPage(page + 1);
    };

    consultarAnalises();
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
    const analisesServer = await analiseService.listAnalises(
      search,
      page,
      10,
      animeId
    );
    setAnalises([...analises, ...analisesServer]);

    if (analisesServer.length === 0 || analisesServer.length < 10)
      setNoMore(false);
    setPage(page + 1);
  }

  return (
    <Wrapper>
      <BtnAnalisar onClick={() => navigate("/animes")}>
        ANALISAR ANIME
      </BtnAnalisar>

      <InfiniteScroll
        dataLength={analises.length}
        next={fetchData}
        hasMore={noMore}
        loader={<Loader />}
        style={{ width: "100%" }}
        endMessage={<EndMessage>Acabou!</EndMessage>}
      >
        <AnalisesWrapper>
          {analises.map((analise) => {
            return (
              <Analise
                key={analise.id}
                onClick={() => navigate(`/analise/${analise.id}`)}
              >
                <ImagemAnalise imagem={analise.thumb}>
                  <AnimeNameWrapper>
                    <AnimeName>{analise.animeName}</AnimeName>
                  </AnimeNameWrapper>
                </ImagemAnalise>
                <AnaliseUserWrapper>
                  <AnaliseUserFoto src={analise.user.foto} />
                  <AnaliseUsername>{analise.user.name}</AnaliseUsername>
                </AnaliseUserWrapper>
              </Analise>
            );
          })}
        </AnalisesWrapper>
      </InfiniteScroll>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const BtnAnalisar = styled(Button)`
  background-color: #0094ff !important;
`;

const AnalisesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 0;
  margin: 0;
  max-width: 969px;
  margin-top: 20px;
  justify-items: center; /* Alinha verticalmente */
`;

const Analise = styled.div`
  width: 200px;
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

const AnaliseUserWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const AnaliseUserFoto = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 50px;
  margin-right: 10px;
  object-fit: cover;
`;

const AnaliseUsername = styled.span`
  letter-spacing: 0.15px;
  color: #000000;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 15px;
  display: inline-block;
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
