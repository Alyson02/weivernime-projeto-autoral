import { useParams } from "react-router-dom";
import styled from "styled-components";
import AnaliseForm from "../../components/AnaliseForm"

export default function AddAnalise() {
  const { animeId } = useParams();

  return (
    <Wrapper>
      <AnaliseForm animeId={animeId}/>     
    </Wrapper>
  );
}


const Wrapper = styled.div`
  margin-top: 50px;
`;
