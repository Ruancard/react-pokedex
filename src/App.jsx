import './App.css';
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// importing hooks
// import { useAuth } from './hooks/useAuth';


// importing pages
import Home from './pages/home/home';

function App() {
  const [pokemonData, setPokemonData] = useState();
  return (
    <div className="App">
      
      <BrowserRouter>
        <div className='container'>
        <Routes>
          < Route path='/' element={< Home />} />          
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
