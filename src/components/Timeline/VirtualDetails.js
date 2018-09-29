import React from "react";
import PropTypes from "prop-types";
import Inspector from "../Inspector";

import { parseData, parseDataObj } from "../../utils/timeline";

import styles from "./Timeline.module.scss";

const VirtualDetails = ({ node }) => {
  const virtual = node.value.value; // { type: 'virtual', value: { type: 'virtual', value: VIRTUAL } }
  return (
    <ul>
      <li>
        <span className={styles.detailsLabel}>Type: </span>
        <Inspector data={parseData(virtual.type)} />
      </li>
      <li>
        <span className={styles.detailsLabel}>Attributes: </span>
        <Inspector data={parseDataObj(virtual.attributes)} />
      </li>
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
