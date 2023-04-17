import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import styled from "styled-components";
import { useState } from "react";
import Sidebar from "./Nav/components/Sidebar";

export default function MainContainer() {
  const [sideBar, setSidebar] = useState(false);

  return (
    <>
      <Nav sideBar={sideBar} setSidebar={setSidebar}/>
      <Wrapper>
        {sideBar && <Sidebar active={setSidebar} />}
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

  @media(max-width: 968px){
    width: 100%;
    padding: 0 10px;
  }
`;
