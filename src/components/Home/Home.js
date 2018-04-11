// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import ConnectForm from "./ConnectForm";
import EvaluateForm from "./EvaluateForm";
import styles from "./Home.module.scss";

export default class Home extends Component {
  static propTypes = {
    server: PropTypes.object.isRequired,
    logger: PropTypes.array.isRequired,

    serverActions: PropTypes.object.isRequired
  };

  handleConnectFormSubmit({ hostname, port }) {
    if (!this.props.server.connected) {
      this.props.serverActions.connect({ hostname, port });
    } else {
      this.props.serverActions.disconnect();
    }
  }

  handleEvaluateFormSubmit({ servicePath, bodyProps, bodyOptions }) {
    this.props.serverActions.evaluateService({ servicePath, bodyProps, bodyOptions });
  }

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <div className={styles.connection}>
          <ConnectForm
            onSubmit={this.handleConnectFormSubmit.bind(this)}
            server={this.props.server}
          />
        </div>

        <div className={styles.logs}>
          {this.props.logger.map((log, key) => <div key={key}>{log}</div>)}
        </div>

        <div className={styles.command}>
          <EvaluateForm
            onSubmit={this.handleEvaluateFormSubmit.bind(this)}
            server={this.props.server}
          />
        </div>
      </div>
    );
  }
}
