// @flow
import { actionTypes } from "../actions/server";

type actionType = {
  type: string
};

const initialState = {
  connecting: false,
  connected: false
};

export default function server(state = initialState, action: actionType) {
  switch (action.type) {
    case actionTypes.CONNECT:
      return {
        ...state,
        connecting: true,
        connected: false
      };
    case actionTypes.CONNECT_SUCCESS:
      return {
        ...state,
        connecting: false,
        connected: true
      };
    case actionTypes.CONNECT_FAIL:
      return {
        ...state,
        connecting: false
      };
    case actionTypes.DISCONNECT_SUCCESS:
      return {
        ...state,
        connected: false
      };
    default:
      return state;
  }
}
