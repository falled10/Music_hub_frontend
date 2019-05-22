import axios from "axios";
import jwt_decode from "jwt-decode";
import superagent from "superagent";
import {
  TOKEN_REFRESHED,
  TOKEN_NOT_REFRESHED,
  USER_LOADED,
  LOGOUT_SUCCESS,
  GET_USERS
} from "../actions/types";

export default function refreshTokenMiddleware() {
  return ({ dispatch, getState }) => next => action => {
    const { type } = action;
    const { token, refresh } = getState().auth;
    console.log(action);
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    console.log(type);
    if (type === LOGOUT_SUCCESS || !type) {
      localStorage.removeItem("refresh");
      return next(action);
    }

    if (type === USER_LOADED || type === TOKEN_REFRESHED) {
      return next(action);
    }

    console.log("refresh");
    const body = JSON.stringify({ refresh });

    if (refresh && type !== TOKEN_REFRESHED) {
      axios
        .post("http://localhost:8000/api/token/refresh/", body, config)
        .then(res => {
          console.log("success");
          dispatch({
            type: TOKEN_REFRESHED,
            payload: res.data
          });
        })
        .catch(err => {
          console.log(err);
          dispatch({
            type: TOKEN_NOT_REFRESHED
          });
        });
    }
    return next(action);
  };
}
