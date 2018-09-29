import { actionTypes as timelineActionTypes } from "../actions/timeline";
import { actionTypes as serverActionTypes } from "../actions/server";

import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";

const initialState = {
  callState: [],
  selectedNodePath: null
};

// path example: '0.1.0.2'
function addInfo(state, info) {
  const path = info.path;
  const pathParts = path.split(".");

  function process(callState, partIndex) {
    const part = pathParts[partIndex];

    let newInfo;
    if (partIndex + 1 < pathParts.length) {
      newInfo = {
        ...callState[part],
        children: process(callState[part].children, partIndex + 1)
      };
    } else {
      newInfo = {
        ...info,
        children: []
      };
    }

    return [...callState.slice(0, part), newInfo, ...callState.slice(part + 1)];
  }

  return {
    ...state,
    callState: process(state.callState, 0)
  };
}

function updateInfo(state, info) {
  const path = info.path;
  const pathParts = path.split(".");

  function process(callState, partIndex) {
    const part = pathParts[partIndex];

    let newInfo;
    if (partIndex + 1 < pathParts.length) {
      newInfo = {
        ...callState[part],
        children: process(callState[part].children, partIndex + 1)
      };
    } else {
      newInfo = {
        ...callState[part],
        ...info,
        children: callState[part].children
      };
    }

    return [...callState.slice(0, part), newInfo, ...callState.slice(part + 1)];
  }

  return {
    ...state,
    callState: process(state.callState, 0)
  };
}

export default function server(state = initialState, action) {
  switch (action.type) {
    case timelineActionTypes.ADD_INFO:
      return addInfo(state, action.info);
    case timelineActionTypes.UPDATE_INFO:
      return updateInfo(state, action.info);
    case timelineActionTypes.SELECT_NODE:
      return {
        ...state,
        selectedNodePath: action.nodePath
      };
    default:
      return state;
  }
}
