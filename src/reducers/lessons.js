import {
  CREATE_LESSON,
  GET_LESSONS,
  GET_LESSON,
  UPDATE_LESSON
} from "../actions/types";

const initialState = {
  title: "",
  value: "",
  lessons: [],
  lesson: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LESSON:
      return {
        ...state,
        lesson: action.payload
      };

    case GET_LESSONS:
      return {
        ...state,
        lessons: action.payload
      };

    case CREATE_LESSON:
      return {
        ...state,
        title: action.payload.title,
        value: action.payload.body
      };

    case GET_LESSON:
      return {
        ...state,
        lesson: action.payload
      };

    default:
      return state;
  }
}
