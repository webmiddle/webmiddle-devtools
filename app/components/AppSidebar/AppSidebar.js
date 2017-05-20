import React, { Component } from "react";
import PropTypes from 'prop-types';
import { List, ListItem } from "material-ui/List";
import IconActionHome from "material-ui/svg-icons/action/home";
import IconFileFolder from "material-ui/svg-icons/file/folder";
import IconActionTimeline from "material-ui/svg-icons/action/timeline";
import Link from "../Link";
import styles from './AppSidebar.scss';

const LinkListItem = ({ to, label, Icon }) => (
  <Link
    className={styles.link}
    to={to}
    activeOnlyWhenExact={to === '/'}
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
};

export default class AppSidebar extends Component {
  render() {
    return (
      <div className={styles.container}>
        <List className={styles.list}>
          <LinkListItem to="/" label="Home" Icon={IconActionHome} />
          <LinkListItem to="/counter" label="State" Icon={IconActionTimeline} />
          <LinkListItem to="/resources" label="Resources" Icon={IconFileFolder} />
        </List>
      </div>
    );
  }
}
