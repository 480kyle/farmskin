/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
// import { useState } from "react";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import SearchFilter from "./SearchFilter";
import { useFilterDispatch, useFilterNextId, useFilterState } from "./SearchFilterContext";

interface DetailSearchInterface {
  offset: any;
}

const DetailSearchWrapper = styled.div`
  position: absolute;
  top: ${(props: DetailSearchInterface) => props.offset? props.offset.top + 50 + 'px' : 0};
  left: ${(props: DetailSearchInterface) => props.offset? props.offset.left - 200 + 'px' : 0};
  padding: 20px;
  width: 360px;
  background: #FFFFFF;
  box-shadow: 0px 4px 14px 6px rgba(151, 151, 151, 0.15);
  border-radius: 8px;
`;
const CloseWrapper = styled.div`
  text-align: right;
`;
const Icon = styled.img`
  margin: 0 5px;
`;
const ButtonWrapper = styled.div`
  margin: 40px auto 0;
  text-align: center;
`;
const Button = styled.button`
  margin: 5px;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 8px;
`;
const AddFilterWrapper = styled.div`
  padding-right: 65px;
  text-align: right;
  `;
const AddFilterButton = styled(Button)`
  width: 180px;
  background-color: #EAF3FE;
  color: #4880EE;
`;
const PrimaryButton = styled(Button)`
  background-color: #4880EE;
  color: #fff;
`;

const DetailSearch = ({offset, onClose, onDetailSearch}: {offset: any, onClose: any, onDetailSearch: any}) => {
  const [filterNames, setFilterNames] = useState<Array<any>>([
    {value: '제목', selected: true},
    {value: '저자명', selected: false},
    {value: '출판사', selected: false}
  ]);
  const filters = useFilterState();
  const dispatch = useFilterDispatch();
  const nextId = useFilterNextId();

  useEffect(() => {
    let nextFilterNames = [...filterNames];
    nextFilterNames.map(filterName => {
      filterName.selected = false;
      filters.map((filter: any) => {
        if(filterName.value === filter.name) filterName.selected = true;
      });
    });
    console.log('nextFilterNames', nextFilterNames);
    setFilterNames(nextFilterNames);
  }, [filters]);

  const onAddFilter = (e: any) => {
    const name = filterNames.find(filterName => !filterName.selected);
    console.log(name.value);
    dispatch({type: 'CREATE', filter: {id: nextId.current, name: name.value, value: ''}});
    nextId.current += 1;
  };

  const onSearch = useCallback(() => {
    onDetailSearch(filters);
  }, [filters]);

  return (
    <DetailSearchWrapper offset={offset}>
      <CloseWrapper>
        <Icon onClick={() => {onClose()}} src="/close-icon.png" />
      </CloseWrapper>
      {filters.length > 0 ? filters.map((filter: any) => (
        <SearchFilter key={filter.id} {...filter} filterNames={filterNames} />
      )): ''}
      <AddFilterWrapper>
        <AddFilterButton style={filters.length === 3 ? {display: 'none'} : {}} onClick={onAddFilter}><Icon src="/plus-icon.png" />검색 조건 추가</AddFilterButton>
      </AddFilterWrapper>
      <ButtonWrapper>
        <Button>초기화</Button><PrimaryButton onClick={onSearch}>검색하기</PrimaryButton>
      </ButtonWrapper>
    </DetailSearchWrapper>
  );
};

export default DetailSearch;