import './App.css';
import Recipe from './Recipe'
import React, {useEffect, useState}from 'react'
import Home from './HomeScreen'
const App = () => {
  
  return (
    <div className="App">
      <div className="container">
        <Home/>
      </div> 
    </div>
  );
}

export default App;
