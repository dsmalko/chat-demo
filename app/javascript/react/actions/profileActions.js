import { UPDATE_PROFILE } from './types'
import profileApi from 'api/profile'

export const updateProfile = (user) => dispatch => {
  return profileApi.update(user)
    .then((updatedUser) => {
      dispatch({
        type: UPDATE_PROFILE,
        payload: updatedUser
      })
    })
    .catch(error => {
      return Promise.reject(error.response.data.errors)
    })
}
