import React, { Fragment } from 'react'
import { Provider } from 'react-redux'
import { HashRouter, Route, Link } from 'react-router-dom'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { generateRequireSignInWrapper } from 'redux-token-auth'
import store from './store'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import Chat from './components/Chat'

const requireSignIn = generateRequireSignInWrapper({
  redirectPathIfNotSignedIn: '/login',
})

const App = () => (
  <HashRouter >
    <Provider store={store}>
      <Fragment>
        <Route exact={true} path="/" component={requireSignIn(Chat)} />
        <Route exact={true} path="/channel/:channelId" component={requireSignIn(Chat)} />
        <Route exact={true} path="/profile" component={requireSignIn(Profile)} />
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/signup" component={Signup} />
      </Fragment>
    </Provider>
  </HashRouter>
)

export default App