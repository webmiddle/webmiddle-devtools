import { createActionTypes } from '../utils/redux';

export const actionTypes = createActionTypes('timeline',
  'ADD_INFO',
  'UPDATE_INFO',

  'SELECT_NODE',
);

export const actionCreators = {
  addInfo: (info) => ({
    type: actionTypes.ADD_INFO,
    info,
  }),

  updateInfo: (info) => ({
    type: actionTypes.UPDATE_INFO,
    info,
  }),

  selectNode: (nodePath) => ({
    type: actionTypes.SELECT_NODE,
    nodePath,
  }),
};
