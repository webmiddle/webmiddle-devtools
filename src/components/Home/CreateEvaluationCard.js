import React, { Component } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { Card, CardHeader } from "material-ui/Card";
import ContentCreateIcon from "material-ui/svg-icons/content/create";
import Avatar from "material-ui/Avatar";

import styles from "./Home.module.scss";

class CreateEvaluationCard extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired
  };

  render() {
    return (
      <Card
        className={cn(styles.card, styles.create)}
        onClick={this.props.onClick}
      >
        <CardHeader
          className={styles.cardHeader}
          title="Create new"
          avatar={
            <Avatar className={styles.avatar} icon={<ContentCreateIcon />} />
          }
        />
      </Card>
    );
  }
}

export default CreateEvaluationCard;
