import styled from "styled-components";
import bg from "../../assets/images/bg.jpg";
import Form from "./components/Form";

export default function Signin() {
  return (
    <Wrapper>
      <DivLeft>
        <Logo>Weivernime</Logo>
        <Form />
      </DivLeft>
      <DivRight></DivRight>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
`;

const DivLeft = styled.div`
  background-color: white;
  width: 31.75%;
  height: 100%;
  padding: 42px 10px 10px;

  @media (max-width: 628px) {
    width: 100%;
  }
`;

const DivRight = styled.div`
  background-image: url(${bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 68.75%;
  height: 100%;
  @media (max-width: 628px) {
    width: 0;
  }
`;

const Logo = styled.h1`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 38px;
  text-align: center;
  color: #0094ff;
`;
