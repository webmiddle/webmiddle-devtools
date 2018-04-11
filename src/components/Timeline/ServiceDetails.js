import React from 'react';
import PropTypes from 'prop-types';
import Inspector from '../Inspector';

import { transformData, transformDataObj } from '../../utils/timeline';

import styles from './Timeline.module.scss';

const ServiceDetails = ({ node }) => (
  <ul>
    <li>
      <span className={styles.detailsLabel}>Service: </span>
      <Inspector data={transformData(node.value)} />
    </li>
    <li>
      <span className={styles.detailsLabel}>Props: </span>
      <Inspector data={transformDataObj(node.options.props)} />
    </li>
  </ul>
);

ServiceDetails.propTypes = {
  node: PropTypes.object.isRequired,
};

export default ServiceDetails;