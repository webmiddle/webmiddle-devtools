// @flow
import { actionTypes } from "../actions/server";
import { parseResource } from "../utils/resources";

type actionType = {
  type: string
};

const initialState = {
  connecting: false,
  connected: false,
  servicePaths: {} // <path, { name, description }>
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
    case actionTypes.FETCH_SERVICE_PATHS_SUCCESS: {
      const resource = parseResource(action.result);
      return {
        ...state,
        servicePaths: JSON.parse(resource.content)
      };
    }
    default:
      return state;
  }
}
