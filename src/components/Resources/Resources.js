// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import SplitPane from "react-split-pane";
import IconActionCode from "material-ui/svg-icons/action/code";

import styles from "./Resources.module.scss";
import ResourcesTreeView from "./ResourcesTreeView";
import ResourcesTabs from "./ResourcesTabs";

export default class Resources extends Component {
  static propTypes = {
    nodeList: PropTypes.array.isRequired,
    openFiles: PropTypes.array.isRequired,
    selectedFileIndex: PropTypes.number.isRequired,
    openFilePaths: PropTypes.object.isRequired,

    resourcesActions: PropTypes.object.isRequired,
    serverActions: PropTypes.object.isRequired
  };

  handlePrettyPrintToggle = () => {
    this.props.resourcesActions.togglePrettyPrint(this.props.selectedFileIndex);
  };

  render() {
    const selectedFile = this.props.openFiles[this.props.selectedFileIndex];
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
            <div className={styles.bottomBar}>
              {selectedFile ? (
                <div>
                  <a
                    className={cn(styles.prettyPrint, {
                      [styles.active]: selectedFile.pretty
                    })}
                    href="javascript:void(0);"
                    title="Pretty print"
                    onClick={this.handlePrettyPrintToggle}
                  >
                    <IconActionCode />
                  </a>
                  <span>{selectedFile.contentType}</span>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </SplitPane>
      </div>
    );
  }
}
