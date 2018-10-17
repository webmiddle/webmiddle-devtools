import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./Evaluation.module.scss";
import { formatTimestamp } from "../../utils";
import Inspector from "../Inspector";

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
        <h3>Logs</h3>
        {this.props.logger.map((log, key) => {
          const formattedTimestamp = formatTimestamp(log.timestamp);
          return (
            <div key={key} className={styles.logInspector}>
              <ul>
                <li className={styles.logs_time}>[{formattedTimestamp}]</li>
                {log.messages.map((message, i) => (
                  <Inspector key={i} data={message} />
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Logs;
