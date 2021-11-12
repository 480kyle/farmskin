import { createContext, useContext, useReducer, useRef } from "react";

const initialFilterList = [
  {id: 1, name: '제목', value: ''}
];

const filterReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.filter);
    case 'UPDATE':
      return state.map((filter: any) => filter.id === action.filter.id? action.filter : filter);
    case 'REMOVE':
      return state.filter((filter: any) => filter.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const FilterStateContext = createContext<any | null>(null);
const FilterDispatchContext = createContext<any | null>(null);
const FilterNextIdContext = createContext<any | null>(null);

export function FilterProvider ({children}: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(filterReducer, initialFilterList);
  const nextId = useRef(2);

  return (
    <FilterStateContext.Provider value={state}>
      <FilterDispatchContext.Provider value={dispatch}>
        <FilterNextIdContext.Provider value={nextId}>
          {children}
        </FilterNextIdContext.Provider>
      </FilterDispatchContext.Provider>
    </FilterStateContext.Provider>
  );
};

export function useFilterState() {
  return useContext(FilterStateContext);
}

export function useFilterDispatch() {
  return useContext(FilterDispatchContext);
}

export function useFilterNextId() {
  return useContext(FilterNextIdContext);
}