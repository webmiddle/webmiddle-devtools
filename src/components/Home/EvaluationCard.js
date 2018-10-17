import React, { Component } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import AlertErrorIcon from "material-ui/svg-icons/alert/error";
import ActionDoneIcon from "material-ui/svg-icons/action/done";
import CircularProgress from "material-ui/CircularProgress";
import Avatar from "material-ui/Avatar";
import isEmpty from "lodash/isEmpty";

import styles from "./Home.module.scss";
import Inspector from "../Inspector";
import { formatTimestamp } from "../../utils";

class ObjectInspector extends Component {
  static propTypes = {
    object: PropTypes.object.isRequired
  };

  render() {
    const { object } = this.props;
    return (
      <div className={styles.objectInspector}>
        <ul>
          {Object.keys(object).map(propName => (
            <li key={propName}>
              <span className={styles.name}>{propName}</span>
              {": "}
              <Inspector data={object[propName]} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const statusIcons = {
  error: <AlertErrorIcon />,
  success: <ActionDoneIcon />,
  progress: <CircularProgress />
};

class EvaluationCard extends Component {
  static propTypes = {
    evaluation: PropTypes.object.isRequired,
    onReattach: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  };

  onReattachActionClick = () => {
    this.props.onReattach(this.props.evaluation);
  };

  onRemoveActionClick = () => {
    this.props.onRemove(this.props.evaluation);
  };

  render() {
    const { evaluation } = this.props;
    return (
      <Card
        key={evaluation.id}
        className={cn(styles.card, styles[evaluation.status])}
      >
        <CardHeader
          className={styles.cardHeader}
          title={evaluation.path}
          subtitle={formatTimestamp(evaluation.created_timestamp, {
            includeDate: true
          })}
          avatar={
            <Avatar
              className={styles.avatar}
              icon={statusIcons[evaluation.status]}
            />
          }
          actAsExpander
        />
        <CardText className={styles.cardBody} expandable>
          <div className={styles.row}>
            <span className={styles.name}>Status</span>
            {": "}
            <span className={styles.value}>{evaluation.status}</span>
          </div>
          {!isEmpty(evaluation.props) ? (
            <div className={styles.row}>
              <span className={styles.name}>Props</span>
              {": "}
              <ObjectInspector object={evaluation.props} />
            </div>
          ) : (
            ""
          )}
          {!isEmpty(evaluation.options) ? (
            <div className={styles.row}>
              <span className={styles.name}>Options</span>
              {": "}
              <ObjectInspector object={evaluation.options} />
            </div>
          ) : (
            ""
          )}
        </CardText>
        <CardActions expandable>
          <FlatButton label="Open" onClick={this.onReattachActionClick} />
          <FlatButton label="Remove" onClick={this.onRemoveActionClick} />
        </CardActions>
      </Card>
    );
  }
}

export default EvaluationCard;
