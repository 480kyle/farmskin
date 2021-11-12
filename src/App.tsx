import React from 'react';

import AppHeader from './AppHeader';
import AppBody from './AppBody';
import { FilterProvider } from './Search/SearchFilter/SearchFilterContext';

function App() {
  return (
    <FilterProvider>
      <div className="App">
        <AppHeader />
        <AppBody />
      </div>
    </FilterProvider>
  );
}

export default App;
