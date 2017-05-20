import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TreeView from 'react-treeview';
import IconFolder from 'material-ui/svg-icons/file/folder';
import IconInsertDriveFile
  from 'material-ui/svg-icons/editor/insert-drive-file';

import styles from './Resources.scss';

const iconsByType = {
  folder: <IconFolder />,
  file: <IconInsertDriveFile />,
};

function makePath(parentPath, node) {
  return parentPath ? `${parentPath}.${node.name}` : node.name;
}

function isFileSelected(selectedFilePath, parentPath, i) {
  return selectedFilePath &&
    selectedFilePath.folderPath === parentPath &&
    selectedFilePath.index === i;
}

// A list of folders/files
export default class ResourcesTreeView extends Component {
  static propTypes = {
    nodeList: PropTypes.array.isRequired,
    parentPath: PropTypes.string,
    selectedFilePath: PropTypes.object,

    resourcesActions: PropTypes.object.isRequired,
  };

  static defaultProps = {
    parentPath: '',
  };

  handleArrowClick = i => {
    const folder = this.props.nodeList[i];
    const folderPath = makePath(this.props.parentPath, folder);
    this.props.resourcesActions.toggleCollapse(folderPath, !folder.collapsed);
  };

  handleFileClick = i => {
    this.props.resourcesActions.openFile(this.props.parentPath, i);
  };

  render() {
    return (
      <div>
        {this.props.nodeList.map((node, i) => (
          <div key={i}>
            {node.type === 'folder' ?
              <TreeView
                nodeLabel={
                  <div className={styles.folder} onClick={() => this.handleArrowClick(i)}>
                    <span className={styles.label}>
                      <span className={styles.icon}>{iconsByType[node.type]}</span>
                      <span className={styles.name}>{node.name}</span>
                    </span>
                  </div>
                }
                collapsed={node.collapsed}
                onClick={() => this.handleArrowClick(i)}
              >
                {node.children &&
                  <ResourcesTreeView
                    nodeList={node.children}
                    parentPath={makePath(this.props.parentPath, node)}
                    selectedFilePath={this.props.selectedFilePath}
                    resourcesActions={this.props.resourcesActions}
                  />
                }
              </TreeView>
            :
              <div
                className={classNames(styles.file, {
                  [styles.selected]: isFileSelected(this.props.selectedFilePath, this.props.parentPath, i)
                })}
                onClick={() => this.handleFileClick(i)}
              >
                <div className={styles.background} />
                <div className={styles.label}>
                  <span className={styles.icon}>{iconsByType[node.type]}</span>
                  <span className={styles.name}>{node.name}</span>
                </div>
              </div>
            }
          </div>
        ))}
      </div>
    );
  }
}
