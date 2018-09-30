import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./Resources.module.scss";
import CodeEditor from "../CodeEditor";
import { modeByContentType } from "../../utils/resources";

function isMoreObject(value) {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor &&
    value.constructor.name === "More"
  );
}

class ResourcesTabContent extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired,

    serverActions: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.loadMoreIfNeeded(this.props.file);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.file !== this.props.file) {
      this.loadMoreIfNeeded(nextProps.file);
    }
  }

  loadMoreIfNeeded(file) {
    if (isMoreObject(file.content)) {
      this.props.serverActions.loadMore(file.content);
    }
  }

  render() {
    const { file } = this.props;

    const fileContent = isMoreObject(file.content)
      ? "" // wait for load more
      : file.pretty
        ? file.contentPretty
        : file.content;

    return (
      <div className={styles.tabContent}>
        <CodeEditor
          id={`resources.tabs.${file.id}`}
          mode={modeByContentType[file.contentType] || "text"}
          value={fileContent}
          height="100%"
          readOnly
        />
      </div>
    );
  }
}

export default ResourcesTabContent;
