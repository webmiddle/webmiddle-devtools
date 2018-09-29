import { actionTypes as serverActionTypes } from "../actions/server";
import { parseResource } from "../utils/resources";

const initialState = ["Waiting for connection..."];

export default function logger(state = initialState, action) {
  switch (action.type) {
    case serverActionTypes.CONNECT:
      return [...state, "Connecting..."];
    case serverActionTypes.CONNECT_SUCCESS:
      return [...state, "Connected"];
    case serverActionTypes.CONNECT_FAIL:
      return [...state, "Connection failed"];
    case serverActionTypes.DISCONNECT_SUCCESS:
      return [...state, "Disconnected"];

    case serverActionTypes.EVALUATE:
      return [...state, "Evaluating..."];
    case serverActionTypes.EVALUATE_SUCCESS: {
      const resource = parseResource(action.result);
      return [...state, `Evaluated: ${JSON.stringify(resource)}`];
    }
    case serverActionTypes.EVALUATE_FAIL:
      return [
        ...state,
        `Evaluation error: ${
          action instanceof Error ? action.stack : JSON.stringify(action)
        }`
      ];
    default:
      return state;
  }
}
