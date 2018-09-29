import React, { Component } from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import VirtualDetails from "./VirtualDetails";
import Inspector from "../Inspector";

import styles from "./Timeline.module.scss";

class TimelineNodeDetails extends Component {
  static propTypes = {
    node: PropTypes.object
  };

  static defaultProps = {
    node: null
  };

  render() {
    const empty = !this.props.node;
    return (
      <div
        className={cn(styles.timelineNodeDetails, {
          [styles.empty]: empty
        })}
      >
        {empty ? (
          "Click on a node on the left panel to inspect it."
        ) : this.props.node.type === "virtual" ? (
          <VirtualDetails node={this.props.node} />
        ) : (
          <Inspector data={this.props.node} />
        )}
      </div>
    );
  }
}

export default TimelineNodeDetails;
