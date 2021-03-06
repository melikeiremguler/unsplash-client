import './App.css';
import React from 'react'
import HomeScreen from './HomeScreen'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import DetailScreen from './DetailScreen';
const App = () => {


  return (
    <Router>
    <div className="App">
      <div className="container">
        <Switch>
        <Route exact path="/"  component={Home}/>
        <Route  path="/photo/:id" component={DetailScreen}/>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;

const Home =() =>(
<HomeScreen/>
);