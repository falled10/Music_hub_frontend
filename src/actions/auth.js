import axios from "axios";
import { returnErrors, createMessage } from "./messages";

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT_SUCCESS,
  GET_USERS,
  USERS_LOADING,
  USERS_NOT_LOADED,
  GET_USER
} from "./types";

export const getUser = id => (dispatch, getState) => {
  axios
    .get(`http://localhost:8000/api/users/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};

export const getUsers = () => (dispatch, getState) => {
  dispatch({
    type: USERS_LOADING
  });

  axios
    .get("http://localhost:8000/api/users/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_USERS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({ type: USERS_NOT_LOADED });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING });

  axios
    .get("http://localhost:8000/api/auth/user/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err.response.data.code);
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const login = (email, password) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });
  console.log(body);

  axios
    .post("http://localhost:8000/api/auth/login/", body, config)
    .then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT_SUCCESS
  });
};

export const register = ({ name, email, password }) => dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name, email, password });

  axios
    .post("http://localhost:8000/api/auth/register/", body, config)
    .then(res => {
      dispatch({
        type: REGISTER_SUCCESS
      });
      dispatch(
        createMessage({
          verifyAccount:
            "You chould verify your account!, please follow the link that we send you in email."
        })
      );
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

export const tokenConfig = getState => {
  const token = getState().auth.token;
  console.log(getState().auth.token);

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
};
