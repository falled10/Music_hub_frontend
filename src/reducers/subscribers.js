import { GET_SUBSCRIBERS, SUBSCRIBE, UNSUBSCRIBE } from "../actions/types";

const initialState = {
  subscribers: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SUBSCRIBERS:
      return {
        ...state,
        subscribers: action.payload
      };

    default:
      return {
        ...state
      };
  }
}
