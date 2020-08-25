import React, { Component } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Stores from './pages/Stores';
import Products from './pages/Products';
import Settings from './pages/Settings';

import Spinner from './components/Spinner';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { auth } from './services/firebase';

function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === false
        ? <Component {...props} />
        : <Redirect to='/dashboard' />}
    />
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false,
        });
      }
    })
  }

  render() {
    return this.state.loading === true ? <Spinner /> : (
      <Router>
        <Switch>
          <Route exact path="/" component={ Home }></Route>
          <PublicRoute path="/signup" authenticated={this.state.authenticated} component={ Signup }></PublicRoute>
          <PublicRoute path="/login" authenticated={this.state.authenticated} component={ Login }></PublicRoute>
          <PrivateRoute path="/dashboard" authenticated={this.state.authenticated} component={ Dashboard }></PrivateRoute>
          <PrivateRoute path="/stores" authenticated={this.state.authenticated} component={ Stores }></PrivateRoute>
          <PrivateRoute path="/products" authenticated={this.state.authenticated} component={ Products }></PrivateRoute>
          <PrivateRoute path="/settings" authenticated={this.state.authenticated} component={ Settings }></PrivateRoute>
        </Switch>
      </Router>
    );
  }
}

export default App;
