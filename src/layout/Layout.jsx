import styled from "styled-components";
import { IMAGES } from "../constants/index";

const Layout = ({ children }) => {
  return (
    <LayoutBox url={IMAGES.background}>
      <StLogoImg>
        <img src={IMAGES.webLogo} alt="logo" />
      </StLogoImg>
      <StMadeby>
        <img src={IMAGES.members} alt="members" />
      </StMadeby>
      <StBottle>
        <img src={IMAGES.bottle} alt="bottle" />
      </StBottle>
      <Box>
        <DivLayout2>{children}</DivLayout2>
      </Box>
    </LayoutBox>
  );
};

export default Layout;

const LayoutBox = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  /* background: #f9f3ea; */
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
`;

const StLogoImg = styled.div`
  position: fixed;
  top: 7.8125vw;
  left: 7.0313vw;
  img {
    width: 17.1354vw;
  }
  @media screen and (max-width: 625px) {
    display: none;
  }
`;

const StMadeby = styled.div`
  position: fixed;
  top: 7.8125vw;
  right: 5%;
  img {
    width: 8.4896vw;
  }
  @media screen and (max-width: 1000px) {
    img {
      width: 15vw;
    }
  }
  @media screen and (max-width: 625px) {
    display: none;
  }
`;

const StBottle = styled.div`
  position: fixed;
  bottom: -3vw;
  left: 0;
  img {
    width: 28vw;
  }
  @media screen and (max-width: 625px) {
    display: none;
  }
`;

const Box = styled.div`
  //핸드폰 화면에 맞춤 처리
  display: flex;
  margin-left: 20%;
  justify-content: center;
  box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 0.4);
  z-index: 1;

  @media screen and (max-width: 1000px) {
    margin: 0 auto;
  }

  @media screen and (max-width: 625px) {
    margin: 0 auto;
    width: 100%;
  }
`;

const DeskTopLayout = styled.div`
  width: 375px;
  height: 100vh;

  position: relative;
  background-color: #f9f3ea;

  display: flex;
  flex-direction: column;
`;
const DivLayout2 = styled.div`
  //핸드폰 화면에 맞춤 처리
  @media screen and (max-width: 420px) {
    width: 100%;
    margin: auto;
    background-color: #f9f3ea;
  }
  width: 375px;
  height: 100vh;
  position: relative;
  margin-left: 0 auto;
  background-color: #f9f3ea;
  display: flex;
  flex-direction: column;
  z-index: 1;
  /* margin: auto; */
  box-shadow: 0 5px 18px -7px rgba(0, 0, 0, 0.4);
`;
