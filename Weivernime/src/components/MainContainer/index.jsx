import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import styled from "styled-components";

export default function MainContainer() {
  return (
    <>
      <Nav />
      <Wrapper>
        <Outlet />
      </Wrapper>
      <Footer />
    </>
  );
}

const Wrapper = styled.div`
  width: 968px;
  height: auto;
  min-height: 82vh;
  margin: 0 auto;
`;
