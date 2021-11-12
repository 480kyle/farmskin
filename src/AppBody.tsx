import styled from "styled-components";
import Search from "./Search/Search";

const Wrapper = styled.div`
  margin: auto;
  max-width: 1000px;
`;

const AppBody = () => {
  return (
    <Wrapper>
      <Search />
    </Wrapper>
  )
};

export default AppBody;