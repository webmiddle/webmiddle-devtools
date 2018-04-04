import React from 'react';
import PropTypes from 'prop-types';

import styles from './Timeline.scss';

const ServiceLabel = ({ service, tries }) => {
  return (
    <span className={styles.serviceLabel}>
      Try {tries} - Service: {service.name}
    </span>
  );
};

ServiceLabel.propTypes = {
  service: PropTypes.object.isRequired,
  tries: PropTypes.number.isRequired,
};

export default ServiceLabel;
