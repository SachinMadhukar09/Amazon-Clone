import React , {useEffect} from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login"
import { auth } from './firebase';
import { ConsoleWriter } from 'istanbul-lib-report';

function App() {

  useEffect(() => {
    // will only runs once when the app component loads..

      auth.onAuthStateChanged(authUser => {
        ConsoleWriter.log("THE USER IS >>> " , authUser)

        if (authUser){
          // the user just logged in / the user was logged in
          dispatchEvent({
            type:"SET_USER",
            user:authUser
          })
        }else {
          // the user is logged out
          dispatchEvent({
            type:"SET_USER",
            user:null
          })
        }
      })
  }, [])
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/">
          <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
