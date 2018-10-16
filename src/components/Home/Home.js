// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import orderBy from "lodash/orderBy";
import values from "lodash/values";
import { withRouter } from "react-router-dom";

import { formatTimestamp } from "../../utils";
import styles from "./Home.module.scss";

import EvaluationCard from "./EvaluationCard";

class Home extends Component {
  static propTypes = {
    server: PropTypes.object.isRequired,

    authActions: PropTypes.object.isRequired,
    serverActions: PropTypes.object.isRequired
  };

  handleLogoutClick = () => {
    this.props.authActions.logout();
  };

  handleEvaluationReattach = evaluation => {
    this.props.serverActions.evaluationReattach({
      evaluationId: evaluation.id
    });
    this.props.history.push("/evaluation");
  };

  handleEvaluationRemove = evaluation => {
    const confirmed = window.confirm("Are you sure?");
    if (confirmed) {
      this.props.serverActions.evaluationRemove({
        evaluationId: evaluation.id
      });
    }
  };

  render() {
    const sortedEvaluations = orderBy(
      values(this.props.server.evaluations),
      "created_timestamp",
      "desc"
    );
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

        <div className={styles.evaluations}>
          Evaluations:
          {sortedEvaluations.map(evaluation => (
            <EvaluationCard
              key={evaluation.id}
              evaluation={evaluation}
              onReattach={this.handleEvaluationReattach}
              onRemove={this.handleEvaluationRemove}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
