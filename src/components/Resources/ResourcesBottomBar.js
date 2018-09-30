import React, { Component } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import IconActionCode from "material-ui/svg-icons/action/code";
import IconNavigationArrowDownward from "material-ui/svg-icons/navigation/arrow-downward";

import styles from "./Resources.module.scss";

class ResourcesBottomBar extends Component {
  static propTypes = {
    openFiles: PropTypes.array.isRequired,
    selectedFileIndex: PropTypes.number.isRequired,

    resourcesActions: PropTypes.object.isRequired
  };

  handlePrettyPrintToggle = () => {
    this.props.resourcesActions.togglePrettyPrint(this.props.selectedFileIndex);
  };

  handleDownloadClick = () => {
    const selectedFile = this.props.openFiles[this.props.selectedFileIndex];
    const content = selectedFile.pretty
      ? selectedFile.contentPretty
      : selectedFile.content;

    const a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(
      new Blob([content], {
        type: selectedFile.contentType
      })
    );
    a.download = selectedFile.name;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  render() {
    const selectedFile = this.props.openFiles[this.props.selectedFileIndex];
    return (
      <div className={styles.bottomBar}>
        {selectedFile ? (
          <div>
            <a
              className={cn(styles.iconButton, styles.prettyPrint, {
                [styles.active]: selectedFile.pretty
              })}
              href="javascript:void(0);"
              title="Pretty print"
              onClick={this.handlePrettyPrintToggle}
            >
              <IconActionCode />
            </a>
            <a
              className={cn(styles.iconButton, styles.download)}
              href="javascript:void(0);"
              title="Download file"
              onClick={this.handleDownloadClick}
            >
              <IconNavigationArrowDownward />
            </a>
            <span>{selectedFile.contentType}</span>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default ResourcesBottomBar;
