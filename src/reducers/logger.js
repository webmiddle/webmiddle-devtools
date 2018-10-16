import { actionTypes as serverActionTypes } from "../actions/server";
import { parseResource } from "../utils/resources";

function createLog(message) {
  return {
    timestamp: Date.now(),
    message
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
      return [...state, createLog("Connection failed")];
    case serverActionTypes.DISCONNECT_SUCCESS:
      return [...state, createLog("Disconnected")];

    case serverActionTypes.EVALUATE:
    case serverActionTypes.EVALUATION_REATTACH:
      return [...state, createLog("Evaluating...")];
    case serverActionTypes.EVALUATE_SUCCESS:
    case serverActionTypes.EVALUATION_REATTACH_SUCCESS: {
      return [...state, createLog(`Evaluated!`)];
    }
    case serverActionTypes.EVALUATE_FAIL:
    case serverActionTypes.EVALUATION_REATTACH_FAIL:
      return [
        ...state,
        createLog(
          `Evaluation error: ${
            action instanceof Error ? action.stack : JSON.stringify(action)
          }`
        )
      ];
    default:
      return state;
  }
}
