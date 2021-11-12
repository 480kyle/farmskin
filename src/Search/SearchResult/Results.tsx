import styled from "styled-components";
import NoResult from "./NoResult";
import ResultItem from "./ResultItem";

const ResultsWrapper = styled.div``;
const ResultTitleWrapper = styled.div`
  margin: 30px 0 50px;
`;
const Title = styled.span`
  font-size: 16px;
  line-height: 24px;
  color: #353C49;
`;
const Count = styled(Title)`
  margin-left: 16px;
`;
const CountNumber = styled.span`
  color: #487fed;
`;

const Results = ({items, totalItemCount}: {items: any, totalItemCount: any}) => {
  return (
    <ResultsWrapper className="results">
      <ResultTitleWrapper><Title>도서 검색 결과</Title><Count>총 <CountNumber>{totalItemCount}</CountNumber> 건</Count></ResultTitleWrapper>
      {items.length ? items.map((item: any) =>
        (<ResultItem key={item.isbn} item={item} />)) : (<NoResult />)}
    </ResultsWrapper>
  )
}

export default Results;