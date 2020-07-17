import { SET_CURRENT_CHANNEL } from './types'
import messagesApi from 'api/messages'

export const setCurrentChannel = (channel) => dispatch => {
  dispatch({
    type: SET_CURRENT_CHANNEL,
    payload: channel
  })
}
