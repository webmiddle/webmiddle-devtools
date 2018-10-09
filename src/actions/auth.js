import {
  createActionTypes,
  asyncActionKeys,
  asyncActionValues
} from "../utils/redux";
import { actionCreators as serverActions } from "./server";

export const actionTypes = createActionTypes(
  "auth",

  asyncActionKeys("FETCH"),
  asyncActionKeys("LOGIN"),
  asyncActionKeys("LOGOUT")
);

export function getStoredData() {
  const authObjString = localStorage.getItem("auth");
  if (!authObjString) return null;
  const authObj = JSON.parse(authObjString);
  return authObj;
}

export function setStoredData(fn) {
  const storedData = getStoredData();
  localStorage.setItem("auth", JSON.stringify(fn(storedData)));
}

export const actionCreators = {
  fetch: () => ({
    types: asyncActionValues(actionTypes, "FETCH"),
    promise: ({ dispatch }) => {
      // fetch auth
      const authObj = getStoredData();
      if (!authObj || !authObj.login) return Promise.resolve();
      const { hostname, port, apiKey } = authObj;
      return dispatch(serverActions.connect({ hostname, port, apiKey }));
    }
  }),

  login: ({ hostname, port, apiKey }) => ({
    types: asyncActionValues(actionTypes, "LOGIN"),
    promise: ({ dispatch }) => {
      setStoredData(() => ({
        hostname,
        port,
        apiKey,
        login: true
      }));
      return dispatch(serverActions.connect({ hostname, port, apiKey }));
    },
    hostname,
    port,
    apiKey
  }),

  logout: () => ({
    types: asyncActionValues(actionTypes, "LOGOUT"),
    promise: ({ dispatch }) => {
      setStoredData(authObj => ({
        ...authObj,
        login: false
      }));
      return dispatch(serverActions.disconnect());
    }
  })
};
