import styled from "styled-components";

export default function Episode({ episode }) {

  return (
    <EpisodeWrapper>
      <Text>EP{episode.countEp}</Text>
      <Text>
        <Rate>{episode.rate}</Rate>/10
      </Text>
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
