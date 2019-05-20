import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  TOKEN_NOT_REFRESHED,
  TOKEN_REFRESHED,
  REGISTER_FAIL,
  REGISTER_SUCCESS
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: false,
  isLoading: false,
  user: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      };

    case TOKEN_REFRESHED:
      localStorage.setItem("access", action.payload.access);
      localStorage.setItem("refresh", action.payload.refresh);
      return {
        ...state,
        token: action.payload.access,
        refresh: action.payload.refresh
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("access", action.payload.access);
      localStorage.setItem("refresh", action.payload.refresh);

      console.log(action.payload.access);
      return {
        ...state,
        refresh: action.payload.refresh,
        token: action.payload.access,
        isAuthenticated: true,
        isLoading: false
      };

    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case TOKEN_NOT_REFRESHED:
    case REGISTER_FAIL:
    case REGISTER_SUCCESS:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        token: null,
        refresh: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      };

    default:
      return state;
  }
}
