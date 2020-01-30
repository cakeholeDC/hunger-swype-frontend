import React from 'react';
// import logo from './logo.svg';
import './App.css';
import MainContainer from './containers/MainContainer.js'
import { Route, Switch } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" component={ MainContainer } />
      </Switch>
    </div>
  );
}

export default App;
