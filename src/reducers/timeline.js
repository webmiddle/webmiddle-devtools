import { actionTypes as timelineActionTypes } from "../actions/timeline";
import { actionTypes as serverActionTypes } from "../actions/server";

import get from "lodash/get";
import cloneDeep from "lodash/cloneDeep";

const initialState = {
  nodeList: [],
  selectedNodePath: null
};

// path example: '0.1.0.2'
function addNode(state, node) {
  const path = node.path;
  const pathParts = path.split(".");

  function process(nodeList, partIndex) {
    const part = pathParts[partIndex];

    let newNode;
    if (partIndex + 1 < pathParts.length) {
      newNode = {
        ...nodeList[part],
        children: process(nodeList[part].children, partIndex + 1)
      };
    } else {
      newNode = {
        ...node,
        children: []
      };
    }

    return [...nodeList.slice(0, part), newNode, ...nodeList.slice(part + 1)];
  }

  return {
    ...state,
    nodeList: process(state.nodeList, 0)
  };
}

function updateNode(state, node) {
  const path = node.path;
  const pathParts = path.split(".");

  function process(nodeList, partIndex) {
    const part = pathParts[partIndex];

    let newNode;
    if (partIndex + 1 < pathParts.length) {
      newNode = {
        ...nodeList[part],
        children: process(nodeList[part].children, partIndex + 1)
      };
    } else {
      newNode = {
        ...nodeList[part],
        ...node,
        children: nodeList[part].children
      };
    }

    return [...nodeList.slice(0, part), newNode, ...nodeList.slice(part + 1)];
  }

  return {
    ...state,
    nodeList: process(state.nodeList, 0)
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
