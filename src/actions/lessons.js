import {
  CREATE_LESSON,
  GET_LESSONS,
  GET_LESSON,
  UPDATE_LESSON,
  DELETE_LESSON,
  DISLIKE_LESSON,
  LIKE_LESSON
} from "./types";
import axios from "axios";
import { tokenConfig } from "./auth";
import { returnErrors, createMessage } from "./messages";

export const createLesson = lesson => (dispatch, getState) => {
  axios
    .post("http://localhost:8000/api/lessons/", lesson, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ createLesson: "Lesson was created!" }));
      dispatch({
        type: CREATE_LESSON,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const allLessons = pageNumber => (dispatch, getState) => {
  axios
    .get(
      `http://localhost:8000/api/lessons/?page=${pageNumber}`,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: GET_LESSONS,
        payload: res.data.results,
        totalPages: res.data.total_pages
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const getLesson = slug => (dispatch, getState) => {
  console.log(slug);
  axios
    .get(`http://localhost:8000/api/lessons/${slug}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_LESSON,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const updateLesson = (lesson, slug) => (dispatch, getState) => {
  axios
    .put(
      `http://localhost:8000/api/lessons/${slug}/`,
      lesson,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(createMessage({ updateLesson: "Lesson was updated!" }));
      dispatch({
        type: UPDATE_LESSON,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteLesson = slug => (dispatch, getState) => {
  axios
    .delete(
      `http://localhost:8000/api/lessons/${slug}/`,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: DELETE_LESSON,
        payload: slug
      });

      dispatch(
        createMessage({ deleteLesson: "Lesson was deleted successful" })
      );
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const likeLesson = slug => (dispatch, getState) => {
  axios
    .post(
      `http://localhost:8000/api/lessons/${slug}/likes/`,
      null,
      tokenConfig(getState)
    )
    .then(res => {})
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
