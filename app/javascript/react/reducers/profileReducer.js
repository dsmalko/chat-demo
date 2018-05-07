import { UPDATE_PROFILE } from '../actions/types'

const initialState = {
}

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_PROFILE:
      console.log(state)
      return {
        ...state,
      }
    default:
      return state
  }
}