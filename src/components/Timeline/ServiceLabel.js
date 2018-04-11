import React from 'react';
import PropTypes from 'prop-types';

import styles from './Timeline.module.scss';

const ServiceLabel = ({ service }) => {
  return (
    <span className={styles.serviceLabel}>
      Service: {service.name}
    </span>
  );
};

ServiceLabel.propTypes = {
  service: PropTypes.object.isRequired,
};

export default ServiceLabel;
