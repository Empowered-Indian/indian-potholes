import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sunset from './pages/Sunset';
import './styles/main.css';

// Project has been sunset - showing only the sunset page
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element={<Sunset />} />
      </Routes>
    </div>
  );
}

export default App;
