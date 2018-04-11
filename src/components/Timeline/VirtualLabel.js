import React from 'react';
import PropTypes from 'prop-types';

import styles from './Timeline.module.scss';

const VirtualLabel = ({ virtual }) => {
  const type = virtual.type;
  const attributes = virtual.attributes;

  // a={1} b="2"
  const attributesList = [];
  Object.keys(attributes).forEach(attrName => {
    const attr = attributes[attrName];

    let attrValueString;
    if (attr.type === 'string') {
      attrValueString = `"${attr.value}"`;
    } else if (attr.type === 'boolean' && attr.value === true) {
      attrValueString = `${attrName}`;
    } else if (attr.type === 'resource') {
      attrValueString = `{[Resource ${attr.value.name}]}`;
    } else if (attr.type === 'virtual') {
      attrValueString = `{[Virtual]}`;
    } else if (attr.type === 'function') {
      attrValueString = `{[Function ${attr.name}]}`;
    } else if (attr.type === 'array') {
      attrValueString = `{[Array(${attr.length})]}`;
    } else if (attr.type === 'object' && attr.value !== null) {
      attrValueString = `{[Object]}`;
    } else {
      attrValueString = `{${attr.value}}`;
    }
    attributesList.push(
      <span className={styles.virtualAttribute} key={attrName}>
        <span className={styles.attributeName}>{attrName}</span>
        <span className={styles.equals}>=</span>
        <span className={styles.attributeValue}>{attrValueString}</span>
      </span>
    );
  });

  const typeElement = (
    <span className={styles.virtualType}>
      {type.type === 'function' ? type.name : type}
    </span>
  );

  return (
    <span className={styles.virtualLabel}>
      <span className={styles.lt}>{'<'}</span>
      {typeElement}
      {attributesList}
      <span className={styles.gt}>{'>'}</span>
    </span>
  );
};

VirtualLabel.propTypes = {
  virtual: PropTypes.object.isRequired,
};

export default VirtualLabel;
