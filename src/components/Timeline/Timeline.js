import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SplitPane from 'react-split-pane';

import TimelineTreeView from './TimelineTreeView';
import TimelineNodeDetails from './TimelineNodeDetails';

import styles from './Timeline.module.scss';

export default class Timeline extends Component {
  static propTypes = {
    callState: PropTypes.array.isRequired,
    selectedNode: PropTypes.object,
    selectedNodePath: PropTypes.string,

    timelineActions: PropTypes.object.isRequired,
  };

  static defaultProps = {
    selectedNode: null,
    selectedNodePath: null,
  };

  render() {
    //console.log(this.props.callState);
    return (
      <div className={styles.container} data-tid="container">
        <SplitPane split="vertical" primary="second" defaultSize={300}>
          <TimelineTreeView
            callState={this.props.callState}
            timelineActions={this.props.timelineActions}
            selectedNodePath={this.props.selectedNodePath}
          />
          <TimelineNodeDetails
            node={this.props.selectedNode}
          />
        </SplitPane>
      </div>
    );
  }
}
