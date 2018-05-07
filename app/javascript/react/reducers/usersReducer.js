import { SET_USERS_ONLINE } from '../actions/types';

const initialState = {
  online: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USERS_ONLINE:
      return {
        ...state,
        online: action.payload
      };
    default:
      return state;
  }
}