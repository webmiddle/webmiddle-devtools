import { actionTypes as serverActionTypes } from "../actions/server";
import { parseResource } from "../utils/resources";

function createLog(...messages) {
  return {
    timestamp: Date.now(),
    messages
  };
}

const initialState = [createLog("Waiting for connection...")];

export default function logger(state = initialState, action) {
  switch (action.type) {
    case serverActionTypes.CONNECT:
      return [...state, createLog("Connecting...")];
    case serverActionTypes.CONNECT_SUCCESS:
      return [...state, createLog("Connected!")];
    case serverActionTypes.CONNECT_FAIL:
      return [
        ...state,
        createLog(
          "Connection failed",
          action.error instanceof Error ? action.error.message : action.error
        )
      ];
    case serverActionTypes.DISCONNECT_SUCCESS:
      return [...state, createLog("Disconnected")];

    case serverActionTypes.EVALUATE:
    case serverActionTypes.EVALUATION_REATTACH:
      return [...state, createLog("Evaluating...")];
    case serverActionTypes.EVALUATE_SUCCESS:
    case serverActionTypes.EVALUATION_REATTACH_SUCCESS: {
      const resource = parseResource(action.result);
      return [...state, createLog("Evaluated! Result", resource)];
    }
    case serverActionTypes.EVALUATE_FAIL:
    case serverActionTypes.EVALUATION_REATTACH_FAIL:
      return [
        ...state,
        createLog(
          "Evaluation error",
          action.error instanceof Error ? action.error.message : action.error
        )
      ];
    default:
      return state;
  }
}
