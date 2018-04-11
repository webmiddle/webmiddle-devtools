import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sortBy from 'lodash/sortBy';
import Resources from '../components/Resources/Resources';
import { actionCreators as resourcesActions } from '../actions/resources';

// TODO: this might be slow with loads of files and folders,
// consider precomputing it.
function getOpenFiles(state) {
  const { nodeList, openFilePaths } = state.resources;

  function getFolder(folderPath) {
    const folderPathParts = folderPath.split('.');

    let currentNodeList = nodeList;
    let currentFolder;
    for (let i = 0; i < folderPathParts.length; i++) {
      const currentPart = folderPathParts[i];
      currentFolder = currentNodeList.find(node => node.type === 'folder' && node.name === currentPart);
      if (i < folderPathParts.length - 1) currentNodeList = currentFolder.children;
    }
    return currentFolder;
  }

  function getFile(filePath) {
    const { folderPath, index } = filePath;
    const folder = getFolder(folderPath);
    return folder.children[index];
  }

  return openFilePaths.list.map(getFile);
}

function mapStateToProps(state) {
  return {
    nodeList: state.resources.nodeList,
    openFiles: getOpenFiles(state),
    selectedFileIndex: state.resources.openFilePaths.selectedIndex,
    openFilePaths: state.resources.openFilePaths,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resourcesActions: bindActionCreators(resourcesActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
