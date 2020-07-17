import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { generateRequireSignInWrapper } from 'redux-token-auth'
import { verifyCredentials } from './redux-token-auth-config'
import store from './store'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import Chat from './components/Chat'

const requireSignIn = generateRequireSignInWrapper({
  redirectPathIfNotSignedIn: '/login',
})

verifyCredentials(store);

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact={true} path="/" component={requireSignIn(Chat)} />
        <Route exact={true} path="/channel/:channelId" component={requireSignIn(Chat)} />
        <Route exact={true} path="/profile" component={requireSignIn(Profile)} />
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/signup" component={Signup} />
      </Switch>
    </Router>
  </Provider>
)

export default App
