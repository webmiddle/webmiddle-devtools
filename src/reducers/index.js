// @flow
import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import server from "./server";
import timeline from "./timeline";
import resources from "./resources";
import logger from "./logger";
import auth from "./auth";

const rootReducer = combineReducers({
  form,

  server,
  timeline,
  resources,
  logger,
  auth
});

export default rootReducer;
