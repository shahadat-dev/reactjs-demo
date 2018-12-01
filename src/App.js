import React, { Component } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'
import { setFakeCurrentUser } from './actions/fakeAuthActions'
import { Provider } from 'react-redux'
import store from './store'

import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'

import A from './components/a/A'
import B from './components/b/B'
import C from './components/c/C'

import More from './components/more/More.js'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import User from './components/user/User'

import './App.css'
import Dashboard from './components/pages/Dashboard'

import Test from './components/Test'

// Check for fakeToken
if (localStorage.fakeToken) {
  // Set auth token header auth
  setAuthToken(localStorage.fakeToken)

  // Set user and isAuthenticated
  store.dispatch(setFakeCurrentUser(JSON.parse(localStorage.fakeUser)))
}

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken)
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))

  // Check for expired token
  const currentTime = Date.now() / 1000
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser())
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/a/" component={A} />
                <Route exact path="/b/" component={B} />
                <Route exact path="/c/" component={C} />
                <Route exact path="/register/" component={Register} />
                <Route exact path="/login/" component={Login} />
                <Route exact path="/more/" component={More} />
                <Route exact path="/user/" component={User} />
                <Route exact path="/dashboard/" component={Dashboard} />
                <Route exact path="/test/" component={Test} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
