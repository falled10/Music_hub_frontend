import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import lessons from "./lessons";

export default combineReducers({
  errors,
  messages,
  auth,
  lessons
});
