import { actionTypes as resourcesActionTypes } from "../actions/resources";
import { prettify } from "../utils/resources";

// EXAMPLE
// const initialState = {
//   nodeList: [
//     {
//       type: "folder",
//       name: "output",
//       collapsed: false,
//       children: [
//         {
//           type: "folder",
//           name: "some",
//           collapsed: false,
//           children: [
//             {
//               type: "file",
//               id: "randomness_01",
//               name: "randomness",
//               contentType: "application/json",
//               content: `
//                 { "foo": { "bar": { "some": "test" } } }
//               `,
//               contentPretty: undefined,
//               pretty: undefined,
//             },
//             {
//               type: "file",
//               id: "crazyness_01",
//               name: "crazyness",
//               contentType: "text/html",
//               content: `
//                 <!DOCTYPE html> <html lang="en"> <head>
//                 <meta charset="UTF-8"> <title>Home</title>
//                 </head> <body> This is content. </body> </html>
//               `,
//               contentPretty: undefined,
//               pretty: undefined,
//             }
//           ]
//         }
//       ]
//     }
//   ],

//   openFilePaths: {
//     list: [
//       {
//         folderPath: "output.some",
//         index: 1
//       }
//     ],
//     selectedIndex: 0
//   }
// };

const initialState = {
  nodeList: [],

  openFilePaths: {
    list: [],
    selectedIndex: -1
  }
};

// folderPath example: 'output.other'
// Note: it creates all the non existing folders
function addFile(
  state,
  folderPath,
  fileId,
  fileName,
  fileContentType,
  fileContent
) {
  if (typeof fileContent !== "string") {
    fileContent = JSON.stringify(fileContent, null, 2);
  }

  const folderPathParts = folderPath.split(".");

  function process(nodeList, folderPathIndex) {
    const currentPart = folderPathParts[folderPathIndex];

    const folderIndex = nodeList.findIndex(
      node => node.type === "folder" && node.name === currentPart
    );
    const folder =
      folderIndex !== -1
        ? nodeList[folderIndex]
        : {
            // create folder
            type: "folder",
            name: currentPart,
            collapsed: false,
            children: []
          };

    let newFolder;
    if (folderPathIndex + 1 < folderPathParts.length) {
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
            type: "file",
            id: fileId,
            name: fileName,
            contentType: fileContentType,
            content: fileContent
          }
        ]
      };
    }

    return folderIndex !== -1
      ? [
          // replace
          ...nodeList.slice(0, folderIndex),
          newFolder,
          ...nodeList.slice(folderIndex + 1)
        ]
      : [
          // append
          ...nodeList,
          newFolder
        ];
  }

  return {
    ...state,
    nodeList: process(state.nodeList, 0)
  };
}

function updateFolder(state, folderPath, fn) {
  const folderPathParts = folderPath.split(".");

  function process(nodeList, folderPathIndex) {
    const currentPart = folderPathParts[folderPathIndex];

    const folderIndex = nodeList.findIndex(
      node => node.type === "folder" && node.name === currentPart
    );
    if (folderIndex === -1) {
      throw new Error(
        `Folder not found: ${currentPart} (index: ${folderPathIndex}), path ${folderPath}`
      );
    }
    const folder = nodeList[folderIndex];

    let newFolder;
    if (folderPathIndex + 1 < folderPathParts.length) {
      // recursion
      newFolder = {
        ...folder,
        children: process(folder.children, folderPathIndex + 1)
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
  return updateFolder(state, folderPath, folder => ({
    ...folder,
    children: [
      ...folder.children.slice(0, index),
      fn(folder.children[index]),
      ...folder.children.slice(index + 1)
    ]
  }));
}

function toggleCollapse(state, folderPath, value) {
  return updateFolder(state, folderPath, folder => ({
    ...folder,
    collapsed: value
  }));
}

function openFile(state, folderPath, index) {
  const openFilePathIndex = state.openFilePaths.list.findIndex(
    openFilePath =>
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
        index
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
      selectedIndex: newSelectedIndex
    }
  };
}

function closeFile(state, folderPath, index) {
  const openFilePathIndex = state.openFilePaths.list.findIndex(
    openFilePath =>
      openFilePath.folderPath === folderPath && openFilePath.index === index
  );

  // remove
  const newList = [
    ...state.openFilePaths.list.slice(0, openFilePathIndex),
    ...state.openFilePaths.list.slice(openFilePathIndex + 1)
  ];
  const newSelectedIndex = newList[state.openFilePaths.selectedIndex]
    ? state.openFilePaths.selectedIndex
    : newList.length - 1;

  return {
    ...state,
    openFilePaths: {
      ...state.openFilePaths,
      list: newList,
      selectedIndex: newSelectedIndex
    }
  };
}

function updateSelectedFileIndex(state, openFileIndex) {
  return {
    ...state,
    openFilePaths: {
      ...state.openFilePaths,
      selectedIndex: openFileIndex
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
      selectedIndex: secondIndex
    }
  };
}

function addResource(state, resource) {
  const parentFolderName = "resources";
  const fileName = `${resource.name}_${resource.id}`;

  const parentFolder = state.nodeList.find(
    node => node.type === "folder" && node.name === parentFolderName
  );
  if (parentFolder) {
    const fileIndex = parentFolder.children.findIndex(
      node => node.type === "file" && node.name === fileName
    );
    if (fileIndex !== -1) {
      // file already exists, update it
      return updateFile(state, parentFolderName, fileIndex, file => ({
        ...file,
        id: resource.id,
        name: fileName,
        contentType: resource.contentType,
        content: resource.content,
        contentPretty: undefined,
        pretty: false
      }));
    }
  }

  return addFile(
    state,
    parentFolderName,
    resource.id,
    fileName,
    resource.contentType,
    resource.content
  );
}

function findAndAddResources(state, data) {
  if (typeof data !== "object" || data === null) {
    return state;
  }

  if (data.constructor && data.constructor.name === "Resource") {
    return addResource(state, data);
  }

  for (const prop in data) {
    if (data.hasOwnProperty(prop)) {
      state = findAndAddResources(state, data[prop]);
    }
  }

  return state;
}

function openResource(state, resourceId) {
  const parentFolderName = "resources";

  const parentFolder = state.nodeList.find(
    node => node.type === "folder" && node.name === parentFolderName
  );
  if (parentFolder) {
    const fileIndex = parentFolder.children.findIndex(
      node => node.type === "file" && node.id === resourceId
    );
    if (fileIndex !== -1) {
      // file exists
      return openFile(state, parentFolderName, fileIndex);
    }
  }

  return state;
}

function togglePrettyPrint(state, openFileIndex) {
  const openFileItem = state.openFilePaths.list[openFileIndex];

  return updateFile(
    state,
    openFileItem.folderPath,
    openFileItem.index,
    file => ({
      ...file,
      contentPretty:
        typeof file.contentPretty !== "undefined"
          ? file.contentPretty
          : prettify(file),
      pretty: !file.pretty
    })
  );
}

export default function resources(state = initialState, action) {
  switch (action.type) {
    case resourcesActionTypes.ADD_FILE:
      return addFile(
        state,
        action.folderPath,
        action.fileId,
        action.fileName,
        action.fileContentType,
        action.fileContent
      );
    case resourcesActionTypes.FIND_AND_ADD_RESOURCES:
      return findAndAddResources(state, action.data);
    case resourcesActionTypes.OPEN_RESOURCE:
      return openResource(state, action.resourceId);
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
    case resourcesActionTypes.TOGGLE_PRETTY_PRINT:
      return togglePrettyPrint(state, action.openFileIndex);
    default:
      return state;
  }
}
