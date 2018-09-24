import React from 'react';
import PropTypes from 'prop-types';
import Inspector from '../Inspector';

import { transformData, transformDataObj } from '../../utils/timeline';

import styles from './Timeline.module.scss';

const VirtualDetails = ({ node }) => {
  return (
    <ul>
      <li>
        <span className={styles.detailsLabel}>Type: </span>
        <Inspector data={transformData(node.value.type)} />
      </li>
      <li>
        <span className={styles.detailsLabel}>Attributes: </span>
        <Inspector data={transformDataObj(node.value.attributes)} />
      </li>
      <li>
        <span className={styles.detailsLabel}>Result: </span>
        <Inspector data={transformData(node.result)} />
      </li>
    </ul>
  );
};

VirtualDetails.propTypes = {
  node: PropTypes.object.isRequired,
};

export default VirtualDetails;
