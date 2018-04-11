import { createActionTypes } from '../utils/redux';

export const actionTypes = createActionTypes('resources',
  'TOGGLE_COLLAPSE',

  'OPEN_FILE',
  'CLOSE_FILE',
  'UPDATE_SELECTED_FILE_INDEX',
  'SWAP_OPEN_FILES',
);

export const actionCreators = {
  toggleCollapse: (folderPath, value) => ({
    type: actionTypes.TOGGLE_COLLAPSE,
    folderPath,
    value,
  }),

  openFile: (folderPath, index) => ({
    type: actionTypes.OPEN_FILE,
    folderPath,
    index,
  }),

  closeFile: (folderPath, index) => ({
    type: actionTypes.CLOSE_FILE,
    folderPath,
    index,
  }),

  updateSelectedFileIndex: (openFileIndex) => ({
    type: actionTypes.UPDATE_SELECTED_FILE_INDEX,
    openFileIndex,
  }),

  swapOpenFiles: (firstIndex, secondIndex) => ({
    type: actionTypes.SWAP_OPEN_FILES,
    firstIndex,
    secondIndex,
  }),
};
