import styled from "styled-components";
import Input from "../Form/Input";

export default function Episode({ rateEpisodes, setRateEpisodes, episode }) {
  function handleChange(e) {
    episode.rate = Number(e.target.value);

    setRateEpisodes((prevStateElement) =>
      prevStateElement.map((element) =>
        element.countEp === episode.countEp ? episode : element
      )
    );
  }

  return (
    <EpisodeWrapper>
      <Text>EP{episode.countEp}</Text>
      <Text>
        <Rate>{episode.rate}</Rate>/10
      </Text>
      <Input
        id={episode.countEp.toString()}
        placeholder="Nota"
        onChange={handleChange}
        value={episode.rate}
      />
    </EpisodeWrapper>
  );
}

const EpisodeWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Rate = styled.span`
  color: #1565c0;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 15px;
`;

const Text = styled.p`
  color: #000000;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 15px;
`;
