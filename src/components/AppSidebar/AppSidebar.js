import React, { Component } from "react";
import PropTypes from "prop-types";
import { List, ListItem } from "material-ui/List";
import IconActionHome from "material-ui/svg-icons/action/home";
import IconFileFolder from "material-ui/svg-icons/file/folder";
import IconActionTimeline from "material-ui/svg-icons/action/timeline";

import Link from "../Link";
import styles from "./AppSidebar.module.scss";

const LinkListItem = ({ to, label, Icon, disabled }) => (
  <Link
    className={styles.link}
    to={to}
    activeOnlyWhenExact={to === "/"}
    disabled={disabled}
  >
    <ListItem
      primaryText={<div className={styles.label}>{label}</div>}
      leftIcon={<Icon />}
    />
  </Link>
);

LinkListItem.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};
LinkListItem.defaultProps = {
  disabled: false
};

class AppSidebar extends Component {
  static propTypes = {
    timelineDisabled: PropTypes.bool.isRequired,
    resourcesDisabled: PropTypes.bool.isRequired
  };

  render() {
    const { timelineDisabled, resourcesDisabled } = this.props;
    return (
      <div className={styles.container}>
        <List className={styles.list}>
          <LinkListItem to="/" label="Home" Icon={IconActionHome} />
          <LinkListItem
            to="/timeline"
            label="Timeline"
            Icon={IconActionTimeline}
            disabled={timelineDisabled}
          />
          <LinkListItem
            to="/resources"
            label="Resources"
            Icon={IconFileFolder}
            disabled={resourcesDisabled}
          />
        </List>
      </div>
    );
  }
}

export default AppSidebar;
