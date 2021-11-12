import { useEffect, useState } from "react";
import styled from "styled-components";
import DetailSearch from "./SearchFilter/DetailSearch";

const Title = styled.h1`
  margin-bottom: 15px;
  font-family: Noto Sans KR;
  font-style: normal;
  font-weight: bold;
  font-size: 22px;
  line-height: 32px;
  color: #1A1E27;
`;
const InputWrapper = styled.div`
  display: inline-block;
  margin-right: 10px;
  padding: 10px 5px;
  width: 480px;
  background: #F2F4F6;
  border-radius: 100px;
`;
const Icon = styled.img`
  margin: 0 10px;
  vertical-align: middle;
`;
const Input = styled.input`
  width: 80%;
  height: 30px;
  background-color: transparent;
  border: none;
  font-size: 16px;
`;
const FilterButton = styled.button`
  padding: 5px 10px;
  font-weight: 500;
  font-size: 14px;
  line-height: 22px;
  color: #8D94A0;
  background-color: #fff;
  border: 1px solid #8D94A0;
  box-sizing: border-box;
  border-radius: 8px;
`;

const SearchInput = ({onSearch}: {onSearch: any}) => {
  const [keyword, setKeyword] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterButton, setFilterButton] = useState<any>(null);
  const [filterButtonOffset, setFilterButtonOffset] = useState<any>(null);

  useEffect(() => {
    if(filterButton) setFilterButtonOffset(filterButton.getBoundingClientRect());
  }, [filterButton])

  const onKeywordChange = (e: any) => {
    setKeyword(e.target.value);
  };

  const onEnter = (e: any) => {
    if(e.key === 'Enter'){
      onSearch({type: 'keyword', keyword: e.target.value});
    }
  };

  const onClose = () => {
    setIsFilterOpen(false);
  };

  const onDetailSearch = (filters: any) => {
    onSearch({type: 'detail', filters: filters});
  };

  return (
    <div>
      <Title>도서 검색</Title>
      <InputWrapper>
        <Icon src="/search-icon.png" /><Input type="text" name="keyword" value={keyword} placeholder="검색어를 입력" onChange={onKeywordChange} onKeyDown={onEnter} />
      </InputWrapper>
      <FilterButton ref={ref => {setFilterButton(ref)}} onClick={() => {setIsFilterOpen(!isFilterOpen)}}>상세검색</FilterButton>
      {isFilterOpen? (<DetailSearch offset={filterButtonOffset} onClose={onClose} onDetailSearch={onDetailSearch} />) : ''}
    </div>
  );
};

export default SearchInput;