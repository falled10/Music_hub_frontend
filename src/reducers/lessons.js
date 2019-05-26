import {
  CREATE_LESSON,
  GET_LESSONS,
  GET_LESSON,
  UPDATE_LESSON,
  DELETE_LESSON,
  LIKE_LESSON,
  DISLIKE_LESSON
} from "../actions/types";

const initialState = {
  title: "",
  value: "",
  lessons: [],
  lesson: {},
  totalPages: 0
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
        lessons: action.payload,
        totalPages: action.totalPages
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

    case DELETE_LESSON:
      return {
        ...state,
        lessons: state.lessons.filter(
          lesson => lesson.slug !== action.payload
        ),
        lesson: null
      };
  }
}
