import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-draggable-tab';

import ResourcesTabContent from './ResourcesTabContent';

export default class ResourcesTabs extends Component {
  static propTypes = {
    openFiles: PropTypes.array.isRequired,
    selectedFileIndex: PropTypes.number.isRequired,
    openFilePaths: PropTypes.object.isRequired,

    resourcesActions: PropTypes.object.isRequired,
    serverActions: PropTypes.object.isRequired,
  };

  onTabClose = (e, key) => {
    const openFileIndex = parseInt(key, 10);
    const { folderPath, index } = this.props.openFilePaths.list[openFileIndex];
    this.props.resourcesActions.closeFile(folderPath, index);

    // stop library own close handler
    // (otherwise it will automatically select the next tab)
    return false;
  }

  onTabSelect = (e, key) => {
    const openFileIndex = parseInt(key, 10);
    this.props.resourcesActions.updateSelectedFileIndex(openFileIndex);
  }

  onTabPositionChange = (e, key, currentTabs) => {
    const openFileIndex = parseInt(key, 10);
    const newOpenFileIndex = currentTabs.findIndex(tabElement => tabElement.key === key);
    this.props.resourcesActions.swapOpenFiles(openFileIndex, newOpenFileIndex);
  }

  render() {
    if (this.props.openFiles.length === 0) return null;

    // TODO: use file id as key?
    // otherwise there could be issues when tab position changes

    return (
      <Tabs
        selectedTab={String(this.props.selectedFileIndex)}
        shouldTabClose={this.onTabClose}
        onTabSelect={this.onTabSelect}
        onTabPositionChange={this.onTabPositionChange}
        tabs={this.props.openFiles.map((file, i) =>
          <Tab
            key={i}
            title={file.name}
          >
            <ResourcesTabContent
              key={i}
              file={file}
              serverActions={this.props.serverActions}
            />
          </Tab>
        )}
      />
    );
  }
}
