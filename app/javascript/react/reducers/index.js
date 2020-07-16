import { combineReducers } from 'redux'
import { reduxTokenAuthReducer } from 'redux-token-auth'
import reduxTokenAuthExtensionReducer from './reduxTokenAuthExtensionReducer'
import messagesReducer from './messagesReducer'
import channelsReducer from './channelsReducer'
import usersReducer from './usersReducer'

const rootReducer = combineReducers({
  reduxTokenAuth: reduxTokenAuthExtensionReducer(reduxTokenAuthReducer),
  messages: messagesReducer,
  channels: channelsReducer,
  users: usersReducer,
})

export default rootReducer
