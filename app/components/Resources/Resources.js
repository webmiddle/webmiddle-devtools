// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SplitPane from 'react-split-pane';
import TreeView from 'react-treeview';
import { Tabs, Tab } from 'react-draggable-tab';
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
class ResourcesTreeView extends Component {
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

class ResourcesTabs extends Component {
  static propTypes = {
    openFiles: PropTypes.array.isRequired,
    selectedFileIndex: PropTypes.number.isRequired,
    openFilePaths: PropTypes.object.isRequired,

    resourcesActions: PropTypes.object.isRequired,
  };

  onTabClose = (e, key) => {
    const openFileIndex = parseInt(key, 10);
    const { folderPath, index } = this.props.openFilePaths.list[openFileIndex];
    this.props.resourcesActions.closeFile(folderPath, index);

    // stop library own close handler
    // (otherwise it will automatically select the next tab)
    return false;
  }

  onTabSelect = (e, key) => {
    const openFileIndex = parseInt(key, 10);
    this.props.resourcesActions.updateSelectedFileIndex(openFileIndex);
  }

  onTabPositionChange = (e, key, currentTabs) => {
    const openFileIndex = parseInt(key, 10);
    const newOpenFileIndex = currentTabs.findIndex(tabElement => tabElement.key === key);
    this.props.resourcesActions.swapOpenFiles(openFileIndex, newOpenFileIndex);
  }

  render() {
    if (this.props.openFiles.length === 0) return null;

    return (
      <Tabs
        selectedTab={String(this.props.selectedFileIndex)}
        shouldTabClose={this.onTabClose}
        onTabSelect={this.onTabSelect}
        onTabPositionChange={this.onTabPositionChange}
        tabs={this.props.openFiles.map((file, i) =>
          <Tab
            key={i}
            title={file.name}
          >
            <div>
              <pre>
                {file.content}
              </pre>
            </div>
          </Tab>
        )}
      />
    );
  }
}

export default class Resources extends Component {
  static propTypes = {
    nodeList: PropTypes.array.isRequired,
    openFiles: PropTypes.array.isRequired,
    selectedFileIndex: PropTypes.number.isRequired,
    openFilePaths: PropTypes.object.isRequired,

    resourcesActions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <SplitPane split="vertical" defaultSize={200}>
          <div className={styles.list}>
            <ResourcesTreeView
              nodeList={this.props.nodeList}
              resourcesActions={this.props.resourcesActions}
              selectedFilePath={this.props.openFilePaths.list[this.props.selectedFileIndex]}
            />
          </div>
          <div className={styles.openFiles}>
            <ResourcesTabs
              openFiles={this.props.openFiles}
              selectedFileIndex={this.props.selectedFileIndex}
              openFilePaths={this.props.openFilePaths}
              resourcesActions={this.props.resourcesActions}
            />
          </div>
        </SplitPane>
      </div>
    );
  }
}
