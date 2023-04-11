import styled from "styled-components";
import lupa from "../../assets/svg/lupa.svg";
import { useContext, useState } from "react";
import SearchContext from "@/contexts/SearchContext";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const { setSearch } = useContext(SearchContext);
  const [value, setValue] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  function handleInputChange(event) {
    const newValue = event.target.value;
    setValue(newValue);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    setDebounceTimeout(
      setTimeout(() => {
        setSearch(newValue);
      }, 2000)
    );
  }

  const navigate = useNavigate();

  return (
    <Wrapper>
      <WrapperInterno>
        <NavLeft>
          <Logo onClick={() => navigate("/home")}>Weivernime</Logo>
          <ItemNav onClick={() => navigate("/analises")}>analises</ItemNav>
        </NavLeft>
        <WrapperSearch>
          <Lupa src={lupa} />
          <InputSearch
            placeholder="Pesquise"
            value={value}
            onChange={handleInputChange}
          />
        </WrapperSearch>
        <NavRight>
          <Pic src="https://alternativanerd.com.br/wp-content/uploads/2019/10/AN_Mushoku-Tensei.jpg" />
          <Logout>logout</Logout>
        </NavRight>
      </WrapperInterno>
    </Wrapper>
  );
}

const Pic = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50px;

  object-fit: cover;
  image-rendering: crisp-edges;
`;

const Logout = styled.p`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  color: #e40000;

  cursor: pointer;
`;

const NavRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 14px;
`;

const Lupa = styled.img`
  position: absolute;
  right: 13px;
  top: 10px;
  cursor: pointer;
`;

const InputSearch = styled.input`
  border: 2px solid #acb1c6;
  border-radius: 100px;
  background-color: transparent;
  color: white;
  padding-left: 13px;
  width: 100%;
  height: 100%;
`;

const WrapperSearch = styled.div`
  box-sizing: border-box;

  position: absolute;
  width: 260px;
  height: 40px;
  /* left: 354px; */
  left: 50%;
  margin-left: -130px;
  top: 30px;
`;

const ItemNav = styled.p`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  cursor: pointer;

  color: #ffffff;
`;

const Logo = styled.p`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  cursor: pointer;
  color: #0094ff;
`;

const NavLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  padding: 0px;
  gap: 14px;
`;

const Wrapper = styled.div`
  background-color: black;
  height: 100px;
`;

const WrapperInterno = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  gap: 10px;
  isolation: isolate;

  width: 968px;
  height: 100px;

  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;

  margin: 0 auto;
`;
