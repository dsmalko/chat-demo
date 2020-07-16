import { FETCH_MESSAGES, ADD_MESSAGE } from '../actions/types';

const initialState = {
  all: [],
  byChannel(channel) {
    return this.all.filter(message => message.channel == channel)
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_MESSAGES:
      return {
        ...state,
        all: action.payload
      };
    case ADD_MESSAGE:
      return {
        ...state,
        all: [...state.all, action.payload]
      };
    default:
      return state;
  }
}