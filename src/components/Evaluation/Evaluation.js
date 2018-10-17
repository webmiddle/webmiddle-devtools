// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";

import EvaluateForm from "./EvaluateForm";
import Logs from "./Logs";
import styles from "./Evaluation.module.scss";

export default class Evaluation extends Component {
  static propTypes = {
    server: PropTypes.object.isRequired,
    logger: PropTypes.array.isRequired,

    serverActions: PropTypes.object.isRequired
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
        <div className={styles.command}>
          <EvaluateForm
            onSubmit={this.handleEvaluateFormSubmit}
            server={this.props.server}
          />
        </div>

        <Logs logger={this.props.logger} />
      </div>
    );
  }
}
