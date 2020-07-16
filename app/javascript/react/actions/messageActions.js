import { FETCH_MESSAGES, ADD_MESSAGE } from './types'
import messagesApi from 'api/messages'
import moment from 'moment'

export const fetchMessages = () => dispatch => {
  messagesApi.getAll()
    .then((messages) => {
      dispatch({
        type: FETCH_MESSAGES,
        payload: messages
      })
    })
}

export const sendMessage = (messageData) => dispatch => {
  const message = {
    ...messageData,
    created_at: moment().format()
  }

  return messagesApi.send(message)
    .then(() => {
      dispatch({
        type: ADD_MESSAGE,
        payload: message
      })
    })
}

export const addMessage = (messageData) => dispatch => {
  const message = {
    ...messageData,
    //created_at: moment().format()
  }

  dispatch({
    type: ADD_MESSAGE,
    payload: message
  })
}
