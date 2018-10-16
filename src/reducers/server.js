// @flow
import { actionTypes } from "../actions/server";
import { parseResource } from "../utils/resources";

type actionType = {
  type: string
};

const initialState = {
  hostname: "",
  port: "",
  connecting: false,
  connected: false,
  servicePaths: {}, // <path, { name, description }>
  evaluations: {}, // <id, { id, created_timestamp, path, props, options, status, result?, errorMessage? }>
  selectedEvaluationId: null
};

export default function server(state = initialState, action: actionType) {
  switch (action.type) {
    case actionTypes.CONNECT:
      return {
        ...state,
        hostname: action.hostname,
        port: action.port,
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
    case actionTypes.FETCH_EVALUATIONS_SUCCESS: {
      const resource = parseResource(action.result);
      return {
        ...state,
        evaluations: JSON.parse(resource.content)
      };
    }
    case actionTypes.EVALUATE:
      return {
        ...state,
        selectedEvaluationId: null
      };
    case actionTypes.EVALUATION_REATTACH:
      return {
        ...state,
        selectedEvaluationId: action.evaluationId
      };
    // case actionTypes.EVALUATION_REMOVE_SUCCESS: {
    //   const evaluations = { ...state.evaluations };
    //   delete evaluations[action.evaluationId];
    //   return {
    //     ...state,
    //     evaluations,
    //     selectedEvaluationId: action.evaluationId === state.selectedEvaluationId
    //       ? null
    //       : state.selectedEvaluationId,
    //   };
    // }
    case actionTypes.NOTIFICATION:
      if (
        action.message.topic === "evaluation:add" ||
        action.message.topic === "evaluation:update"
      ) {
        const { evaluation } = action.message.data;
        return {
          ...state,
          evaluations: {
            ...state.evaluations,
            [evaluation.id]: evaluation
          }
        };
      }
      if (action.message.topic === "evaluation:remove") {
        const { evaluation } = action.message.data;
        const evaluations = { ...state.evaluations };
        delete evaluations[evaluation.id];
        return {
          ...state,
          evaluations,
          selectedEvaluationId:
            action.evaluationId === state.selectedEvaluationId
              ? null
              : state.selectedEvaluationId
        };
      }
      return state;
    default:
      return state;
  }
}
