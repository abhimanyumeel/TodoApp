import React from 'react';
import CardContainer from './Components/CardContainer';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from './Components/Auth/Register';
import Navigation from './Components/Navigation';

function App(){
  return (
    <Router>
      <div className='app'>
        <Navigation />
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todos" element={<CardContainer />} />
        <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App