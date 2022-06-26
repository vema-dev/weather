import React, { useContext } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

import Welcome from './components/welcome';
import DynamicComponents from './components/DynamicComponent';

import ApiKeyContext from './contexts/apiKeyContext';

function App() {
  const state = useContext(ApiKeyContext);
  const IsApi = ({ target }) => {
    const Target = DynamicComponents[target].default;
    return state.apiKey ? <Target /> : <Navigate to='/' />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/list' element={<IsApi target='LocationList' />} />
        <Route path='/details/:id' element={<IsApi target='Details' />} />
        <Route path='/' element={<Welcome />} />
        <Route path='*' element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
