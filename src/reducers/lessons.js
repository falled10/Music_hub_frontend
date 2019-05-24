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

    case DELETE_LESSON:
      return {
        ...state,
        lessons: state.lessons.filter(lesson => lesson.slug !== action.payload)
      };

    case LIKE_LESSON:
      state.lessons.find(lesson => lesson.slug === action.slug).likes = [
        ...state.lessons
          .find(l => l.slug === action.slug)
          .likes.filter(l => l.liker !== action.payload.liker),
        action.payload
      ];
      return {
        ...state,
        lessons: [...state.lessons]
      };
    case DISLIKE_LESSON:
      state.lessons.find(lesson => lesson.slug === action.slug).likes = [
        ...state.lessons
          .find(l => l.slug === action.slug)
          .likes.filter(l => l.liker.id !== action.payload)
      ];
      return {
        ...state,
        lessons: [...state.lessons]
      };
  }
}
