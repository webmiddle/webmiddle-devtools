import { actionTypes as timelineActionTypes } from "../actions/timeline";
import { actionTypes as serverActionTypes } from "../actions/server";

import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";

const initialState = {
  callState: [],
  selectedNodePath: null
};

// path example: '0.1.0.2'
function addNode(state, node) {
  const path = node.path;
  const pathParts = path.split(".");

  function process(callState, partIndex) {
    const part = pathParts[partIndex];

    let newNode;
    if (partIndex + 1 < pathParts.length) {
      newNode = {
        ...callState[part],
        children: process(callState[part].children, partIndex + 1)
      };
    } else {
      newNode = {
        ...node,
        children: []
      };
    }

    return [...callState.slice(0, part), newNode, ...callState.slice(part + 1)];
  }

  return {
    ...state,
    callState: process(state.callState, 0)
  };
}

function updateNode(state, node) {
  const path = node.path;
  const pathParts = path.split(".");

  function process(callState, partIndex) {
    const part = pathParts[partIndex];

    let newNode;
    if (partIndex + 1 < pathParts.length) {
      newNode = {
        ...callState[part],
        children: process(callState[part].children, partIndex + 1)
      };
    } else {
      newNode = {
        ...callState[part],
        ...node,
        children: callState[part].children
      };
    }

    return [...callState.slice(0, part), newNode, ...callState.slice(part + 1)];
  }

  return {
    ...state,
    callState: process(state.callState, 0)
  };
}

export default function server(state = initialState, action) {
  switch (action.type) {
    case timelineActionTypes.ADD_NODE:
      return addNode(state, action.node);
    case timelineActionTypes.UPDATE_NODE:
      return updateNode(state, action.node);
    case timelineActionTypes.SELECT_NODE:
      return {
        ...state,
        selectedNodePath: action.nodePath
      };
    default:
      return state;
  }
}
