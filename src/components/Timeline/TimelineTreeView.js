import React, { Component } from "react";
import PropTypes from "prop-types";
import TreeView from "react-treeview";
import classNames from "classnames";

import { makePath } from "../../utils/timeline";
import TimelineNodeLabel from "./TimelineNodeLabel";

import styles from "./Timeline.module.scss";

export default class TimelineTreeView extends Component {
  static propTypes = {
    callState: PropTypes.array.isRequired,
    parentPath: PropTypes.string,
    selectedNodePath: PropTypes.string,

    timelineActions: PropTypes.object.isRequired
  };

  static defaultProps = {
    parentPath: "",
    selectedNodePath: null
  };

  render() {
    return (
      <div className={styles.timelineTreeView}>
        {this.props.callState.map((node, i) => {
          const nodePath = makePath(this.props.parentPath, i);
          const hasChildren = node.children && node.children.length !== 0;
          return (
            <div
              key={i}
              className={classNames({
                [styles.noChildren]: !hasChildren
              })}
            >
              <TreeView
                nodeLabel={
                  <div
                    className={classNames(styles.inline, {
                      [styles.selected]:
                        nodePath === this.props.selectedNodePath
                    })}
                  >
                    <div className={styles.background} />
                    <TimelineNodeLabel
                      node={node}
                      parentPath={this.props.parentPath}
                      index={i}
                      timelineActions={this.props.timelineActions}
                    />
                  </div>
                }
                collapsed={node.collapsed}
              >
                {hasChildren && (
                  <TimelineTreeView
                    callState={node.children}
                    parentPath={nodePath}
                    timelineActions={this.props.timelineActions}
                    selectedNodePath={this.props.selectedNodePath}
                  />
                )}
              </TreeView>
            </div>
          );
        })}
      </div>
    );
  }
}
