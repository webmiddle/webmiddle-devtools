// @flow
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";
import promiseMiddleware from "./promiseMiddleware";

const promise = promiseMiddleware();
const enhancer = applyMiddleware(thunk, promise);

function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}

export { configureStore };
