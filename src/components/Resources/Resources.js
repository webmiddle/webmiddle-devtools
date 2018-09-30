// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import SplitPane from "react-split-pane";

import styles from "./Resources.module.scss";
import ResourcesTreeView from "./ResourcesTreeView";
import ResourcesTabs from "./ResourcesTabs";
import ResourcesBottomBar from "./ResourcesBottomBar";

export default class Resources extends Component {
  static propTypes = {
    nodeList: PropTypes.array.isRequired,
    openFiles: PropTypes.array.isRequired,
    selectedFileIndex: PropTypes.number.isRequired,
    openFilePaths: PropTypes.object.isRequired,

    resourcesActions: PropTypes.object.isRequired,
    serverActions: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <SplitPane split="vertical" defaultSize={200}>
          <div className={styles.list}>
            <ResourcesTreeView
              nodeList={this.props.nodeList}
              resourcesActions={this.props.resourcesActions}
              selectedFilePath={
                this.props.openFilePaths.list[this.props.selectedFileIndex]
              }
            />
          </div>
          <div className={styles.openFiles}>
            <ResourcesTabs
              openFiles={this.props.openFiles}
              selectedFileIndex={this.props.selectedFileIndex}
              openFilePaths={this.props.openFilePaths}
              resourcesActions={this.props.resourcesActions}
              serverActions={this.props.serverActions}
            />
            <ResourcesBottomBar
              openFiles={this.props.openFiles}
              selectedFileIndex={this.props.selectedFileIndex}
              resourcesActions={this.props.resourcesActions}
            />
          </div>
        </SplitPane>
      </div>
    );
  }
}
