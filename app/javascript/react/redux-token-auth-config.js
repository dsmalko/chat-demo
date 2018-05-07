import axios from 'axios'
import { generateAuthActions } from 'redux-token-auth'

const config = {
  authUrl: '/auth',
  userAttributes: {
    email: 'email',
    id: 'id',
    uid: 'uid',
    nickname: 'nickname',
    avatar_thumb_url: 'avatar_thumb_url',
    avatar_medium_url: 'avatar_medium_url',
  },
  // storage: {
  //   flushGetRequests: false
  // }
  userRegistrationAttributes: {
    nickname: 'nickname',
  },
}

axios.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    return config
  },
  error =>
    Promise.reject(error),
)

const {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
} = generateAuthActions(config)

export {
  registerUser,
  signInUser,
  signOutUser,
  verifyCredentials,
}
