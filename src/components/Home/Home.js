// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";

import EvaluateForm from "./EvaluateForm";
import Logs from "./Logs";
import styles from "./Home.module.scss";

export default class Home extends Component {
  static propTypes = {
    server: PropTypes.object.isRequired,
    logger: PropTypes.array.isRequired,

    serverActions: PropTypes.object.isRequired,
    authActions: PropTypes.object.isRequired
  };

  handleLogoutClick = () => {
    this.props.authActions.logout();
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
          <span>
            Connected to {this.props.server.hostname}:{this.props.server.port}
          </span>
          <RaisedButton
            className={styles.logoutButton}
            type="submit"
            label="Logout"
            primary
            onClick={this.handleLogoutClick}
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
