import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./Home.module.scss";

function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  let hours = date.getHours();
  if (hours < 10) {
    hours = "0" + hours;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  let seconds = date.getSeconds();
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  let milliseconds = date.getMilliseconds();
  if (milliseconds < 10) {
    milliseconds = "00" + milliseconds;
  } else if (milliseconds < 100) {
    milliseconds = "0" + milliseconds;
  }

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

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
