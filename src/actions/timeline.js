import { createActionTypes } from '../utils/redux';

export const actionTypes = createActionTypes('timeline',
  'SELECT_NODE',
);

export const actionCreators = {
  selectNode: (nodePath) => ({
    type: actionTypes.SELECT_NODE,
    nodePath,
  }),
};
