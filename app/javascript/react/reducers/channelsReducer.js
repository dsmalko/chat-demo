import { SET_CURRENT_CHANNEL } from '../actions/types';

const initialState = {
  all: ['general', 'support'],
  current: 'general'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_CHANNEL:
      return {
        ...state,
        current: action.payload
      };
    default:
      return state;
  }
}