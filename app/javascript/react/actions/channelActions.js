import { SET_CURRENT_CHANNEL } from './types'

export const setCurrentChannel = (channel) => dispatch => {
  dispatch({
    type: SET_CURRENT_CHANNEL,
    payload: channel
  })
}
