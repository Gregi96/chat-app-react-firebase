import './App.css';
import React, { useEffect, useState } from 'react';

import { auth } from './services/firebase';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';

import { Chat, Home, Login, Signup } from './pages';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  
    auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
        setLoading(false);
      } else {
        setAuthenticated(false);
        setLoading(false);
      }
    });
  }, []);

  return loading === true ? (
    <h2>...loading</h2>
  ) : (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <PrivateRoute
          path="/chat"
          authenticated={authenticated}
          component={Chat}
        ></PrivateRoute>
        <PublicRoute
          path="/signup"
          authenticated={authenticated}
          component={Signup}
        ></PublicRoute>
        <PublicRoute
          path="/login"
          authenticated={authenticated}
          component={Login}
        ></PublicRoute>
      </Switch>
    </Router>
  );
}

export default App;
