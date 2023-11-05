import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from "./pages/HomePage.js";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
