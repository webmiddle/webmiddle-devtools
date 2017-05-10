// @flow
import { actionTypes } from '../actions/counter';

export type counterStateType = {
  counter: number
};

type actionType = {
  type: string
};

export default function counter(state: number = 0, action: actionType) {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return state + 1;
    case actionTypes.DECREMENT:
      return state - 1;
    default:
      return state;
  }
}
