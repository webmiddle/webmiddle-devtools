import { createActionTypes } from "../utils/redux";

export const actionTypes = createActionTypes(
  "timeline",
  "ADD_NODE",
  "UPDATE_NODE",

  "SELECT_NODE"
);

export const actionCreators = {
  addNode: node => ({
    type: actionTypes.ADD_NODE,
    node
  }),

  updateNode: node => ({
    type: actionTypes.UPDATE_NODE,
    node
  }),

  selectNode: nodePath => ({
    type: actionTypes.SELECT_NODE,
    nodePath
  })
};
