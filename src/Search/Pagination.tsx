import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

interface PaginationWrapperInterface {
  isShow: boolean;
}
interface ArrowButtonInterface {
  background: string
}

const PaginationWrapper = styled.div`
  margin: 50px 0 80px;
  display: ${(props: PaginationWrapperInterface) => props.isShow? 'block' : 'none'};
  text-align: center;
`;
const Button = styled.button`
  margin: 0 3px;
  padding: 2px 8px;
  background-color: #fff;
  border: 1px solid #DADADA;
  box-sizing: border-box;
  border-radius: 4px;
  vertical-align: middle;

  &.active{
    color: #fff;
    background-color: #4880EE;
  }
`;
const ArrowButton = styled(Button)`
  width: 24px;
  height: 24px;
  background: url(${(props: ArrowButtonInterface) => props.background});
  background-repeat: no-repeat;
  background-position: 50% 55%;
`;
// const reducer = (state: any, action: any) => {
//   switch(action.name){
//     case 'prev-page':
//       if(state === 1) return;
//       return state - 1;
//     case 'next-page':
//       if(state === action.value) return;
//       return state + 1;
//     case 'page-number':
//       return parseInt(action.value);
//   }
// };

const Pagination = ({start, totalItems, onPageChange}: {start: number, totalItems: number, onPageChange: any}) => {
  // const [currentPage, dispatchCurrentPage] = useReducer(reducer, 1);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageList, setPageList] = useState<Array<number>>([]);
  const [lastPage, setLastPage] = useState<number>(1);

  useEffect(() => {
    setCurrentPage(Math.ceil(start / 10));
    let nextLastPage = Math.ceil(totalItems / 10);
    let pageListLength = 10;
    if(nextLastPage > 99) nextLastPage = 99;
    const calcPageNumbers = Array.from({ length: nextLastPage > 10 ? pageListLength : nextLastPage }, (v, i) => {
      if(currentPage > 5) return currentPage - 5 + i;
      else return i + 1;
    });
    setLastPage(nextLastPage);
    setPageList(calcPageNumbers);
  }, [start, totalItems, currentPage]);

  const onClick = useCallback((e: any) => {
    switch(e.target.name){
      case 'prev-page':
      if(currentPage === 1) return;
      return setCurrentPage(currentPage - 1);
    case 'next-page':
      if(currentPage === lastPage) return;
      return setCurrentPage(currentPage + 1);
    }
  }, [currentPage, lastPage]);
  
  const onPageClick = useCallback(page => {
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  return (
    <PaginationWrapper isShow={!!start && !!totalItems}>
      <ArrowButton
        name="prev-page"
        disabled={currentPage === 1}
        onClick={onClick}
        background="/prev-icon.png"
      ></ArrowButton>
      {pageList.map(pageItem => 
        (<Button key={pageItem} className={pageItem === currentPage ? 'active' : ''} name="page-number" value={pageItem} onClick={() => onPageClick(pageItem)}>{pageItem}</Button>)
      )}
      <ArrowButton
        name="next-page"
        value={lastPage}
        disabled={currentPage === lastPage}
        onClick={onClick}
        background="/next-icon.png"
      ></ArrowButton>
    </PaginationWrapper>
  )
}

export default Pagination;