import { combineReducers } from 'redux'
import { reduxTokenAuthReducer } from 'redux-token-auth'
import profileReducer from './profileReducer'
import messagesReducer from './messagesReducer'
import channelsReducer from './channelsReducer'
import usersReducer from './usersReducer'

const rootReducer = combineReducers({
  reduxTokenAuth: reduxTokenAuthReducer,
  profile: profileReducer,
  messages: messagesReducer,
  channels: channelsReducer,
  users: usersReducer,
})

export default rootReducer