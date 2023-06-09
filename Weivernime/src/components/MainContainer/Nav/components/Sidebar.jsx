import React from "react";
import { FaHome, FaNotesMedical, FaTimes } from "react-icons/fa";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";
import { Link } from "react-router-dom";
import {MdReviews} from "react-icons/md"


const Sidebar = ({ active }) => {
  const closeSidebar = () => {
    active(false);
  };

  return (
    <Container sidebar={active}>
      <FaTimes onClick={closeSidebar} />
      <Content>
        <Link to={"/home"} style={{textDecoration:"none"}}>
          <SidebarItem Text="Home" Icon={FaHome} fecha={closeSidebar} />
        </Link>
        <Link to={"/admin"} style={{textDecoration:"none"}}>
          <SidebarItem
            Text="Analises"
            Icon={MdReviews}
            fecha={closeSidebar}
          />
        </Link>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  z-index: 1000;
  position: fixed;
  background-color: rgb(0 126 255);
  height: 100%;
  top: 0px;
  left: 0px;
  width: 400px;
  left: ${(props) => (props.sidebar ? "0" : "-100%")};
  animation: showSidebar 0.4s;
  > svg {
    position: fixed;
    color: white;
    width: 30px;
    height: 30px;
    margin-top: 32px;
    margin-left: 32px;
    cursor: pointer;
  }
  @keyframes showSidebar {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 400px;
    }
  }
  @media (max-width: 412px) {
    width: 100%;

    @keyframes showSidebar {
      from {
        opacity: 0;
        width: 0;
      }
      to {
        opacity: 1;
        width: 100%;
      }
    }
  }
`;

const Content = styled.div`
  margin-top: 100px;
`;

export default Sidebar;
