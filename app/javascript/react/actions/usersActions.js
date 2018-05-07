import { SET_USERS_ONLINE } from './types'

export const setUsersOnline = (users) => dispatch => {
  dispatch({
    type: SET_USERS_ONLINE,
    payload: users
  })
}