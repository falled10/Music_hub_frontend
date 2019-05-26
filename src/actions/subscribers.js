import { GET_SUBSCRIBERS } from "./types";
import axios from "axios";
import { tokenConfig } from "./auth";
import { returnErrors, createMessage } from "./messages";

export const getSubscribers = id => (dispatch, getState) => {
  axios
    .get(
      `http://localhost:8000/api/user/${id}/subscribers/`,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch({
        type: GET_SUBSCRIBERS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const subscribe = id => (dispatch, getState) => {
  axios
    .post(
      `http://localhost:8000/api/user/${id}/subscribe/`,
      null,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(
        createMessage({ subscribe: "You have been successful subscribe" })
      );
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const unsubscribe = id => (dispatch, getState) => {
  axios
    .post(
      `http://localhost:8000/api/user/${id}/unsubscribe/`,
      null,
      tokenConfig(getState)
    )
    .then(res => {
      dispatch(
        createMessage({ unsubscribe: "You have been successful unsubscribe" })
      );
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
