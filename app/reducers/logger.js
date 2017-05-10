import { actionTypes as serverActionTypes } from '../actions/server';

const initialState = [
  'Waiting for connection...'
];

export default function logger(state = initialState, action) {
  switch (action.type) {
    case serverActionTypes.CONNECT:
      return [
        ...state,
        'Connecting...',
      ];
    case serverActionTypes.CONNECT_SUCCESS:
      return [
        ...state,
        'Connected'
      ];
    case serverActionTypes.CONNECT_FAIL:
      return [
        ...state,
        `Connection failed.`
      ];
    default:
      return state;
  }
}
