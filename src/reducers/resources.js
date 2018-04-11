import { actionTypes as serverActionTypes } from '../actions/server';
import { actionTypes as resourcesActionTypes } from '../actions/resources';

const initialState = {
  nodeList: [
    {
      type: 'folder',
      name: 'output',
      collapsed: false,
      children: [{
        type: 'folder',
        name: 'some',
        collapsed: false,
        children: [
          {
            type: 'file',
            name: 'randomness',
            contentType: 'text/plain',
            content: 'aa aaa aaaa',
          },
          {
            type: 'file',
            name: 'crazyness',
            contentType: 'text/plain',
            content: 'bbb bbb bb',
          }
        ]
      }],
    }
  ],

  openFilePaths: {
    list: [
      {
        folderPath: 'output.some',
        index: 1,
      }
    ],
    selectedIndex: 0,
  },
};

// folderPath example: 'output.other'
// Note: it creates all the non existing folders
function addFile(state, folderPath, fileName, fileContentType, fileContent) {
  const folderPathParts = folderPath.split('.');

  function process(nodeList, folderPathIndex) {
    const currentPart = folderPathParts[folderPathIndex];

    const folderIndex = nodeList.findIndex(node => node.type === 'folder' && node.name === currentPart);
    const folder = folderIndex !== -1 ? nodeList[folderIndex] : {
      // create folder
      type: 'folder',
      name: currentPart,
      collapsed: false,
      children: [],
    };

    let newFolder;
    if ((folderPathIndex + 1) < folderPathParts.length) {
      // sub folder: recursion
      newFolder = {
        ...folder,
        children: process(folder.children, folderPathIndex + 1)
      };
    } else {
      // file: append
      newFolder = {
        ...folder,
        children: [
          ...folder.children,
          {
            type: 'file',
            name: fileName,
            contentType: fileContentType,
            content: fileContent,
          }
        ]
      };
    }

    return folderIndex !== -1 ? [
      // replace
      ...nodeList.slice(0, folderIndex),
      newFolder,
      ...nodeList.slice(folderIndex + 1)
    ] : [
      // append
      ...nodeList,
      newFolder,
    ];
  }

  return {
    ...state,
    nodeList: process(state.nodeList, 0)
  };
}

function updateFolder(state, folderPath, fn) {
  const folderPathParts = folderPath.split('.');

  function process(nodeList, folderPathIndex) {
    const currentPart = folderPathParts[folderPathIndex];

    const folderIndex = nodeList.findIndex(node => node.type === 'folder' && node.name === currentPart);
    if (folderIndex === -1) {
      throw new Error(`Folder not found: ${currentPart} (index: ${folderPathIndex}), path ${folderPath}`);
    }
    const folder = nodeList[folderIndex];

    let newFolder;
    if ((folderPathIndex + 1) < folderPathParts.length) {
      // recursion
      newFolder = {
        ...folder,
        children: process(folder.children, folderPathIndex + 1),
      };
    } else {
      newFolder = fn(folder);
    }

    return [
      ...nodeList.slice(0, folderIndex),
      newFolder,
      ...nodeList.slice(folderIndex + 1)
    ];
  }

  return {
    ...state,
    nodeList: process(state.nodeList, 0)
  };
}

function updateFile(state, folderPath, index, fn) {
  return updateFolder(state, folderPath, (folder) => ({
    ...folder,
    children: [
      ...folder.children.slice(0, index),
      fn(folder.children[index]),
      ...folder.children.slice(index + 1)
    ]
  }));
}

function toggleCollapse(state, folderPath, value) {
  return updateFolder(state, folderPath, (folder) => ({
    ...folder,
    collapsed: value,
  }));
}

function openFile(state, folderPath, index) {
  const openFilePathIndex = state.openFilePaths.list.findIndex(openFilePath =>
    openFilePath.folderPath === folderPath && openFilePath.index === index
  );

  let newList;
  let newSelectedIndex;
  if (openFilePathIndex === -1) {
    // append
    newList = [
      ...state.openFilePaths.list,
      {
        folderPath,
        index,
      }
    ];
    newSelectedIndex = newList.length - 1;
  } else {
    // just update the selected index
    newList = state.openFilePaths.list;
    newSelectedIndex = openFilePathIndex;
  }

  return {
    ...state,
    openFilePaths: {
      ...state.openFilePaths,
      list: newList,
      selectedIndex: newSelectedIndex,
    }
  };
}

function closeFile(state, folderPath, index) {
  const openFilePathIndex = state.openFilePaths.list.findIndex(openFilePath =>
    openFilePath.folderPath === folderPath && openFilePath.index === index
  );

  // remove
  const newList = [
    ...state.openFilePaths.list.slice(0, openFilePathIndex),
    ...state.openFilePaths.list.slice(openFilePathIndex + 1),
  ];
  const newSelectedIndex = newList[state.openFilePaths.selectedIndex] ?
    state.openFilePaths.selectedIndex : newList.length - 1;

  return {
    ...state,
    openFilePaths: {
      ...state.openFilePaths,
      list: newList,
      selectedIndex: newSelectedIndex,
    }
  };
}

function updateSelectedFileIndex(state, openFileIndex) {
  return {
    ...state,
    openFilePaths: {
      ...state.openFilePaths,
      selectedIndex: openFileIndex,
    }
  };
}

function swapOpenFiles(state, firstIndex, secondIndex) {
  const newList = [...state.openFilePaths.list];
  const temp = newList[firstIndex];
  newList[firstIndex] = newList[secondIndex];
  newList[secondIndex] = temp;

  return {
    ...state,
    openFilePaths: {
      ...state.openFilePaths,
      list: newList,
      selectedIndex: secondIndex,
    }
  };
}

export default function resources(state = initialState, action) {
  switch (action.type) {
    case serverActionTypes.EVALUATE_SUCCESS:
      return addFile(state, 'output.brandnew', action.result.name, action.result.contentType, action.result.content);
    case resourcesActionTypes.TOGGLE_COLLAPSE:
      return toggleCollapse(state, action.folderPath, action.value);
    case resourcesActionTypes.OPEN_FILE:
      return openFile(state, action.folderPath, action.index);
    case resourcesActionTypes.CLOSE_FILE:
      return closeFile(state, action.folderPath, action.index);
    case resourcesActionTypes.UPDATE_SELECTED_FILE_INDEX:
      return updateSelectedFileIndex(state, action.openFileIndex);
    case resourcesActionTypes.SWAP_OPEN_FILES:
      return swapOpenFiles(state, action.firstIndex, action.secondIndex);
    default:
      return state;
  }
}