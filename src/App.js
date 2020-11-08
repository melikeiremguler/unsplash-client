import './App.css';
import React from 'react'
import HomeScreen from './HomeScreen'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import DetailScreen from './DetailScreen';
const App = () => {


  return (
    <Router>
    <div className="App">
      <div className="container">
        <Switch>
        <Route exact path="/" exact component={Home}/>
        <Route exact path="/photo/:id" component={DetailScreen}/>
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