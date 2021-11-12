import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import parse from "xml-parser";
import reqInfo from "../reqInfo";
import Pagination from "./Pagination";
import { useFilterState } from "./SearchFilter/SearchFilterContext";
import SearchInput from "./SearchInput";
import Results from "./SearchResult/Results";

interface AnyObject {
  [key: string]: any;
}

const jsonFromXml = (data: any) => {
  const jsonFromXml = parse(data);
  let nextItems: (any | undefined)[] = [];
  let nextDataStart: string | undefined = '';
  let nextTotal: string | undefined = '';
  jsonFromXml.root.children[0].children.map(obj => {
    switch(obj.name){
      case 'start':
        nextDataStart = obj.content;
        break;
      case 'total':
        nextTotal = obj.content;
        break;
      case 'item':
        nextItems.push(obj);
        break;
    }
  });

  nextItems = nextItems.map((item: any) => {
    let nextItem: AnyObject = {};
    item.children.map((data: any) => {
      nextItem[data.name] = data.content.replace(/&lt;b&gt;/g, '<b>').replace(/&lt;\/b&gt;/g, '</b>');
    });
    return nextItem;
  });

  return {
    nextDataStart: parseInt(nextDataStart),
    nextTotal: parseInt(nextTotal),
    nextItems: nextItems
  }
}

const Search = () => {
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [items, setItems] = useState<any>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [start, setStart] = useState<number>(1);
  const [isDetailSearch, setIsDetailSearch] = useState<boolean>(false);
  const filters = useFilterState();
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<any>(null);
  
  const fetchItems = async (nextKeyword: string, nextStart: number) => {
    if(!nextKeyword) return;
    try{
       // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      // setError(null);
       // loading 상태를 true 로 바꿉니다.
      // setLoading(true);
      const {data} = await axios.get(reqInfo.url, {
        headers: reqInfo.headers,
        params: {
          query: nextKeyword,
          dispaly: 10,
          start: nextStart
        }
      });
      setStart(data.start);
      setTotalItemCount(data.total);
      setItems(data.items);
    } catch (e) {
      // setError(e);
    }
  
    // setLoading(false);
  };
  
  useEffect(() => {
    fetchItems(keyword, start);
  }, [keyword, start]);

  const fetchDetailSearchItems = async (filters: any, nextStart = 1) => {
    let detailParams: AnyObject = {};
    setKeyword('');

    filters.map((filter: any) => {
      if(!filter.value) return;
      switch(filter.name){
        case '제목':
          detailParams['d_titl'] = filter.value;
          break;
        case '저자명':
          detailParams['d_auth'] = filter.value;
          break;
        case '출판사':
          detailParams['d_publ'] = filter.value;
          break;
      }
    });

    if(!detailParams) return;

    const {data} = await axios.get(reqInfo.detailSearchUrl, {
      headers: reqInfo.headers,
      params: {
        ...detailParams,
        dispaly: 10,
        start: nextStart
      }
    });
    const {nextDataStart, nextTotal, nextItems} = jsonFromXml(data);
    setStart(nextDataStart);
    setTotalItemCount(nextTotal);
    setItems(nextItems);
  };

  const onSearch = useCallback(({type, keyword, filters}: {type: any, keyword?:any, filters?:any}) => {
    console.log('search:', type);
    switch(type){
      case 'keyword':
        setIsDetailSearch(false);
        return setKeyword(keyword);
      case 'detail':
        setIsDetailSearch(true);
        return fetchDetailSearchItems(filters);
    }
  }, []);

  const onPageChange = useCallback((e: any) => {
    const nextStart = (e - 1) * 10 + 1; // 요청된 페이지의 첫번째를 요소를 찾기 위해 계산
    if(isDetailSearch){
      fetchDetailSearchItems(filters, nextStart);
    }else{
      fetchItems(keyword, nextStart);
    }
  }, [keyword, filters]);

  return (
    <div>
      <SearchInput onSearch={onSearch} />
      <Results totalItemCount={totalItemCount} items={items} />
      <Pagination start={start} totalItems={totalItemCount} onPageChange={onPageChange} />
    </div>
  );
};

export default Search;