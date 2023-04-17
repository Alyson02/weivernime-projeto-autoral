import styled from "styled-components";
import lupa from "@/assets/svg/lupa.svg";
import { useContext, useState } from "react";
import SearchContext from "@/contexts/SearchContext";
import { useNavigate } from "react-router-dom";
import { UseAuth } from "@/contexts/Auth/useAuth";
import LetteredAvatar from "react-lettered-avatar";
import { useUserPhotoContext } from "@/contexts/UserPhoto/useUserPhoto";
import { FaBars } from "react-icons/fa";

export default function Nav({ setSidebar, sideBar }) {
  const { setSearch } = useContext(SearchContext);
  const [value, setValue] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const showSiderbar = () => setSidebar(!sideBar);

  const { photoURL } = useUserPhotoContext();

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

  const auth = UseAuth();

  return (
    <Wrapper>
      <WrapperInterno>
        <NavLeft>
          <CustomFaBars
            color="white"
            onClick={showSiderbar}
            size={30}
            style={{ cursor: "pointer" }}
          />
          <Logo onClick={() => navigate("/home", { state: { animeId: 0 } })}>
            Weivernime
          </Logo>
          <ItemNav id="analise-nav-item" onClick={() => navigate("/analises")}>
            analises
          </ItemNav>
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
          {auth.user ? (
            <>
              <UserPhotoWrapper
                onClick={() => navigate(`userPerfil/${auth.user.user.id}`)}
              >
                {auth.user.user.foto ? (
                  <Pic src={photoURL ? photoURL : auth.user.user.foto} />
                ) : (
                  <CustomLetteredAvatar
                    name={auth.user.user.name}
                    size={50}
                    backgroundColor="#1565c0"
                  />
                )}
              </UserPhotoWrapper>
              <Logout
                onClick={() => {
                  auth.logout();
                  navigate("/");
                }}
              >
                logout
              </Logout>
            </>
          ) : (
            <ItemNav onClick={() => navigate("/")}>login</ItemNav>
          )}
        </NavRight>
      </WrapperInterno>
    </Wrapper>
  );
}

const CustomFaBars = styled(FaBars)`
  display: none;
  @media (max-width: 720px) {
    display: block;
  }
`;

const UserPhotoWrapper = styled.div`
  position: relative;
  border-radius: 50px;
  cursor: pointer;
`;

const CustomLetteredAvatar = styled(LetteredAvatar)`
`;

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

  color: white;

  :hover {
    color: #b30606;
  }

  cursor: pointer;
`;

const NavRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 14px;

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 2px;
  }
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

  @media (max-width: 570px) {
    width: 180px;
    margin-left: -90px;
  }
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

  @media (max-width: 720px) {
    display: none;
  }
`;

const NavLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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

  @media (max-width: 968px) {
    width: 100%;
  }
`;
