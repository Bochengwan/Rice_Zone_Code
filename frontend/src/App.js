import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Landing from './Component/Landing/Landing'
import Main from './Component/Main/Main'
import Profile from './Component/Profile/Profile'


function App() {
  return (

      <Router>
        <div className="App">
        <Switch>
          <Route exact path={"/"}>
            <Landing />
          </Route>
          <Route exact path={"/main"} component={Main}></Route>
          <Route exact path={"/profile"} component={Profile}></Route>
        </Switch>
        </div>
      </Router>
  );
}

export default App;
