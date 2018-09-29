import React from "react";
import PropTypes from "prop-types";
import Inspector from "../Inspector";

import { parseData, parseDataObj } from "../../utils/timeline";

import styles from "./Timeline.module.scss";

const VirtualDetails = ({ node }) => {
  const virtual = node.value.value; // { type: 'virtual', value: { type: 'virtual', value: VIRTUAL } }
  const name = virtual.type.name || virtual.type.value;
  const attributes = parseDataObj(virtual.attributes);
  const attributeNames = Object.keys(attributes);
  return (
    <ul className={styles.virtualDetails}>
      <li className={styles.detailsHead}>{`<${name}>`}</li>

      {attributeNames.length > 0 ? (
        <li>
          <span className={styles.detailsLabel}>Props: </span>
          <ul>
            {attributeNames.map(attrName => (
              <li key={attrName}>
                <span>{attrName}: </span>
                <Inspector data={attributes[attrName]} />
              </li>
            ))}
          </ul>
        </li>
      ) : (
        ""
      )}

      <li>
        <span className={styles.detailsLabel}>Result: </span>
        <Inspector data={parseData(node.result)} />
      </li>
    </ul>
  );
};

VirtualDetails.propTypes = {
  node: PropTypes.object.isRequired
};

export default VirtualDetails;
