import { actionTypes as timelineActionTypes } from '../actions/timeline';
import { actionTypes as serverActionTypes } from '../actions/server';

const initialState = {
  callState: [],
  selectedNodePath: null,
};

// path example: '0.1.0.2'
function addInfo(state, path, info) {
  const pathParts = path.split('.');

  function process(callState, partIndex) {
    const part = pathParts[partIndex];

    let newInfo;
    if ((partIndex + 1) < pathParts.length) {
      newInfo = {
        ...callState[part],
        children: process(callState[part].children, partIndex + 1),
      };
    } else {
      newInfo = {
        ...info,
        children: [],
      };
    }

    return [
      ...callState.slice(0, part),
      newInfo,
      ...callState.slice(part + 1),
    ];
  }

  return {
    ...state,
    callState: process(state.callState, 0)
  };
}

export default function server(state = initialState, action) {
  switch (action.type) {
    case serverActionTypes.EVALUATE_PROGRESS:
      if (action.status === 'callStateInfo:add') {
        return addInfo(state, action.path, action.info);
      }
      return state;
    case timelineActionTypes.SELECT_NODE:
      return {
        ...state,
        selectedNodePath: action.nodePath,
      };
    default:
      return state;
  }
}
