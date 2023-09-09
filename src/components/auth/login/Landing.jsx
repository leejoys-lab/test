import styled from "styled-components";

const Landing = () => {
  return (
    <StContainer>
      <StDiv>
        <StMsg>카카오 로그인중...!</StMsg>
      </StDiv>
    </StContainer>
  );
};

export default Landing;

const StContainer = styled.div`
  background-color: #f9f3ea;
  display: flex;
  align-items: center;
  flex-direction: row;
  height: 100%;
`;

const StDiv = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StMsg = styled.div`
  font-size: 2.5rem;
  color: #4a8a51;
`;
