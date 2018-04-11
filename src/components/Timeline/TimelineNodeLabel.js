import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { makePath } from '../../utils/timeline';
import VirtualLabel from './VirtualLabel';
import ServiceLabel from './ServiceLabel';

import styles from './Timeline.module.scss';

class TimelineNodeLabel extends Component {
  static propTypes = {
    node: PropTypes.object.isRequired,
    parentPath: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,

    timelineActions: PropTypes.object.isRequired,
  };

  handleClick = () => {
    const path = makePath(this.props.parentPath, this.props.index);
    this.props.timelineActions.selectNode(path);
  }

  render() {
    const { node } = this.props;
    console.log('node', node);

    return (
      <div className={styles.nodeLabel} onClick={this.handleClick}>
        {node.type === 'virtual' ?
          <VirtualLabel virtual={node.value} />
        : node.type === 'service' ?
          <ServiceLabel
            service={node.value}
            tries={node.options.tries}
          />
        : ''}
      </div>
    );
  }
}

export default TimelineNodeLabel;
