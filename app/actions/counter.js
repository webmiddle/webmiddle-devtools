// @flow
import type { counterStateType } from '../reducers/counter';
import { createActionTypes } from '../utils/redux';

export const actionTypes = createActionTypes('counter',
  'INCREMENT',
  'DECREMENT'
);

export const actionCreators = {
  increment: () => {
    return {
      type: actionTypes.INCREMENT
    };
  },

  decrement: () => {
    return {
      type: actionTypes.DECREMENT
    };
  },

  incrementIfOdd: () => {
    return (dispatch: () => void, getState: () => counterStateType) => {
      const { counter } = getState();

      if (counter % 2 === 0) {
        return;
      }

      dispatch(actionCreators.increment());
    };
  },

  incrementAsync: (delay: number = 1000) => {
    return (dispatch: () => void) => {
      setTimeout(() => {
        dispatch(actionCreators.increment());
      }, delay);
    };
  }
};
