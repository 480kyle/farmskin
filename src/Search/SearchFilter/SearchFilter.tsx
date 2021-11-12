/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useFilterDispatch } from "./SearchFilterContext";

const FilterWrapper = styled.div`
  margin: 5px 0;
`;
const Select = styled.select`
  margin-right: 10px;
  width: 100px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #D2D6DA;
`;
const Input = styled.input`
  margin-right: 10px;
  width: 176px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #4880EE;
`;
const Icon = styled.img`
  vertical-align: middle;
`;

const SearchFilter = ({id, name, value, filterNames}: {id: number, name: string, value: string, filterNames: Array<any>}) => {
  const dispatch = useFilterDispatch();
  const [filterName, setFilterName] = useState<string>('제목');
  const [filterValue, setFilterValue] = useState<string>('');

  useEffect(() => {
    if(!filterName || !filterValue) return;
    dispatch({type: 'UPDATE', filter: {
        id: id, name: filterName, value: filterValue
      }
    });
  }, [filterName, filterValue]);

  useEffect(() => {
    setFilterName(name);
    setFilterValue(value);
  }, [name, value]);

  const onRemove = useCallback(() => {
    dispatch({type: 'REMOVE', id});
  }, []);

  const onFilterNameChange = useCallback((e: any) => {
    setFilterName(e.target.value);
    filterNames.map(filter => filter.value === e.target.value? {value: filter.value, selected: true} : filter);
  }, [filterName]);

  const onFilterInputChange = useCallback((e: any) => {
    setFilterValue(e.target.value);
  }, [filterValue]);

  return (
    <FilterWrapper key={id}>
      <Select name={id + ''} value={filterName || ''} onChange={onFilterNameChange}>
        {filterNames.map(
          (filter, index) => 
          (<option disabled={filter.selected} key={index} value={filter.value}>{filter.value}</option>)
        )}
      </Select>
      <Input name={id + ''} value={filterValue || ''} onChange={onFilterInputChange} placeholder="검색어 입력" />
      <Icon style={id === 1? {display: 'none'} : {}} src="/del-icon.png" onClick={onRemove} />
    </FilterWrapper>
  );
};

export default React.memo<any>(SearchFilter);