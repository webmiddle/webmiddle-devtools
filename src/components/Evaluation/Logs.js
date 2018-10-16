import React, { Component } from "react";
import PropTypes from "prop-types";

import { formatTimestamp } from "../../utils";
import styles from "./Evaluation.module.scss";

function getMaxScrollTop(el) {
  return el.scrollHeight - el.clientHeight;
}

export const runScroll = (dom, offset) => {
  dom.scrollTop = offset; // eslint-disable-line no-param-reassign
};

class Logs extends Component {
  static propTypes = {
    logger: PropTypes.array.isRequired
  };

  componentWillUpdate() {
    this.wasScrolled = this.isScrolled();
  }

  componentDidUpdate() {
    if (this.wasScrolled) this.scrollToBottom();
  }

  isScrolled() {
    const THRESHOLD = 0;
    const el = this.refs.el;

    return Math.ceil(el.scrollTop) >= getMaxScrollTop(el) - THRESHOLD;
  }

  scrollToBottom() {
    this.refs.el.scrollTop = getMaxScrollTop(this.refs.el);
  }

  render() {
    return (
      <div ref="el" className={styles.logs}>
        {this.props.logger.map((log, key) => {
          const formattedTimestamp = formatTimestamp(log.timestamp);
          return (
            <div key={key}>
              <span className={styles.logs_time}>[{formattedTimestamp}]</span>
              &nbsp;
              <span>{log.message}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Logs;
