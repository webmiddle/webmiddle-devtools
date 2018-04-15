import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Inspector from '../Inspector';

import VirtualDetails from './VirtualDetails';

import styles from './Timeline.module.scss';

class TimelineNodeDetails extends Component {
  static propTypes = {
    node: PropTypes.object,
  };

  static defaultProps = {
    node: null,
  };

  render() {
    return (
      <div className={styles.timelineNodeDetails}>
        {!this.props.node ?
          'Click on a node on the left panel to inspect it.'
        : this.props.node.type === 'virtual' ?
          <VirtualDetails node={this.props.node} />
        :
          <Inspector data={this.props.node} />
        }
      </div>
    );
  }
}

export default TimelineNodeDetails;
