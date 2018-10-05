// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";

import ConnectForm from "./ConnectForm";
import EvaluateForm from "./EvaluateForm";
import Logs from "./Logs";
import styles from "./Home.module.scss";

export default class Home extends Component {
  static propTypes = {
    server: PropTypes.object.isRequired,
    logger: PropTypes.array.isRequired,

    serverActions: PropTypes.object.isRequired
  };

  handleConnectFormSubmit = ({ hostname, port }) => {
    if (!this.props.server.connected) {
      this.props.serverActions
        .connect({ hostname, port })
        .then(() => this.props.serverActions.fetchServicePaths());
    } else {
      this.props.serverActions.disconnect();
    }
  };

  handleEvaluateFormSubmit = ({ servicePath, bodyProps, bodyOptions }) => {
    this.props.serverActions.evaluateService({
      servicePath,
      bodyProps,
      bodyOptions
    });
  };

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.connection}>
          <ConnectForm
            onSubmit={this.handleConnectFormSubmit}
            server={this.props.server}
          />
        </div>

        <Logs logger={this.props.logger} />

        <div className={styles.command}>
          <EvaluateForm
            onSubmit={this.handleEvaluateFormSubmit}
            server={this.props.server}
          />
        </div>
      </div>
    );
  }
}
