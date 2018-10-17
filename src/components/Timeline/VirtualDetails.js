import React from "react";
import PropTypes from "prop-types";
import Inspector from "../Inspector";

import { parseData, parseDataObj } from "../../utils/timeline";

import styles from "./Timeline.module.scss";

const VirtualDetails = ({ node }) => {
  const options = parseDataObj(node.options);
  const optionNames = Object.keys(options);

  const virtual = node.value.value; // { type: 'virtual', value: { type: 'virtual', value: VIRTUAL } }
  const name = virtual.type.name || virtual.type.value;
  const attributes = parseDataObj(virtual.attributes);
  const attributeNames = Object.keys(attributes);

  const hasResult = node.result && node.result.type !== "undefined";
  const hasError = node.error && node.error.type !== "undefined";

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

      {optionNames.length > 0 ? (
        <li>
          <span className={styles.detailsLabel}>Options: </span>
          <ul>
            {optionNames.map(optionName => (
              <li key={optionName}>
                <span>{optionName}: </span>
                <Inspector data={options[optionName]} />
              </li>
            ))}
          </ul>
        </li>
      ) : (
        ""
      )}

      {hasResult ? (
        <li>
          <span className={styles.detailsLabel}>Result: </span>
          <Inspector data={parseData(node.result)} />
        </li>
      ) : (
        ""
      )}

      {hasError ? (
        <li>
          <span className={styles.detailsLabel}>Error: </span>
          <Inspector data={parseData(node.error)} />
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};

VirtualDetails.propTypes = {
  node: PropTypes.object.isRequired
};

export default VirtualDetails;
