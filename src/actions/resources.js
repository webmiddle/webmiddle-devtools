import { createActionTypes } from "../utils/redux";

export const actionTypes = createActionTypes(
  "resources",
  "ADD_FILE",
  "FIND_AND_ADD_RESOURCES",
  "OPEN_RESOURCE",

  "TOGGLE_COLLAPSE",

  "OPEN_FILE",
  "CLOSE_FILE",
  "UPDATE_SELECTED_FILE_INDEX",
  "SWAP_OPEN_FILES",
  "TOGGLE_PRETTY_PRINT"
);

export const actionCreators = {
  addFile: (folderPath, fileId, fileName, fileContentType, fileContent) => ({
    type: actionTypes.ADD_FILE,
    folderPath,
    fileId,
    fileName,
    fileContentType,
    fileContent
  }),

  findAndAddResources: data => ({
    type: actionTypes.FIND_AND_ADD_RESOURCES,
    data
  }),

  openResource: resourceId => ({
    type: actionTypes.OPEN_RESOURCE,
    resourceId
  }),

  toggleCollapse: (folderPath, value) => ({
    type: actionTypes.TOGGLE_COLLAPSE,
    folderPath,
    value
  }),

  openFile: (folderPath, index) => ({
    type: actionTypes.OPEN_FILE,
    folderPath,
    index
  }),

  closeFile: (folderPath, index) => ({
    type: actionTypes.CLOSE_FILE,
    folderPath,
    index
  }),

  updateSelectedFileIndex: openFileIndex => ({
    type: actionTypes.UPDATE_SELECTED_FILE_INDEX,
    openFileIndex
  }),

  swapOpenFiles: (firstIndex, secondIndex) => ({
    type: actionTypes.SWAP_OPEN_FILES,
    firstIndex,
    secondIndex
  }),

  togglePrettyPrint: openFileIndex => ({
    type: actionTypes.TOGGLE_PRETTY_PRINT,
    openFileIndex
  })
};
