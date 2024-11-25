import React from 'react';
import CardContainer from './Components/CardContainer';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from './Components/Navigation';
import { useCards } from './useCards';

function App(){
  const {cardsQuery} = useCards();
  const { data: cards, error, isLoading } = cardsQuery;
  return (
    <Router>
      <div className='app'>
        <Navigation />
        <Routes>
        <Route path="/todos" element={
          isLoading ? (
            <div>Loading cards...</div>
          ) : error ? (
            <div>Error loading cards: {error.message}</div>
          ) : (
          <CardContainer activities={cards}/> 
  )
}
/>
        </Routes>
      </div>
    </Router>
  )
}

export default App