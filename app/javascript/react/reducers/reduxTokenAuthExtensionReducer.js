import { UPDATE_PROFILE } from '../actions/types'

export default reducer => (state, action) => {
  switch(action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          attributes: action.payload
        }
      }
    default:
      return reducer(state, action)
  }
}
