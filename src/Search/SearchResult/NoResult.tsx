import styled from "styled-components";

const Wrapper = styled.div`
  padding: 120px 0 300px;
  text-align: center;
`;
const Icon = styled.img``;
const Description = styled.div`
  margin-top: 24px;
  font-size: 16px;
  line-height: 24px;
  color: #6D7582;
`;

const NoResult = () => {
  return (
    <Wrapper>
      <Icon src="/icon_book.png" alt="검색된 결과 없음" />
      <Description>검색된 결과가 없습니다.</Description>
    </Wrapper>
  );
};

export default NoResult;