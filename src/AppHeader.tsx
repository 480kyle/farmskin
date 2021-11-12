import styled from "styled-components";

const HeaderWrapper = styled.div`
  margin-bottom: 80px;
  padding: 15px 0;
  background: #EAF3FE;
`;
const Logo = styled.h1`
  margin: auto;
  max-width: 1000px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 32px;
  color: #1A1E27;
`;

const AppHeader = () => {
  return (
    <HeaderWrapper>
      <Logo>30COS Books</Logo>
    </HeaderWrapper>
  )
};

export default AppHeader;