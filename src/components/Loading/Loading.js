import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";

import styles from "./Loading.module.scss";

class Loading extends React.Component {
  static propTypes = {
    immediate: PropTypes.bool
  };

  static defaultProps = {
    immediate: false
  };

  state = {
    slow: false
  };

  componentDidMount() {
    this.timeout = setTimeout(() => {
      this.setState({ slow: true });
    }, 1500);
  }

  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  render() {
    return (
      <div
        className={cn(styles.container, {
          [styles.immediate]: this.props.immediate,
          [styles.slow]: this.state.slow
        })}
      >
        <div className={styles.spinner} />
      </div>
    );
  }
}

export default Loading;
