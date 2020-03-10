import axios from "axios";
import jwt_decode from "jwt-decode";
import superagent from "superagent";
import { loadUser } from "../actions/auth";
import {
  TOKEN_REFRESHED,
  TOKEN_NOT_REFRESHED,
  USER_LOADED,
  LOGOUT_SUCCESS,
  GET_USERS,
  INVALID_TOKEN
} from "../actions/types";

export const refreshTokenMiddleware = store => next => action => {
  if (action.type === INVALID_TOKEN) {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const { refresh } = store.getState().auth;
    const body = JSON.stringify({ refresh });
    axios
      .post("http://localhost:8000/api/token/refresh/", body, config)
      .then(res => {
        console.log("refresh");
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        store.getState().auth.token = res.data.access;
        store.getState().auth.refresh = res.data.refresh;
        next(loadUser());
      });
  }
  next(action);
};
