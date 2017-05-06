// @flow
import React, { Component } from 'react';
import type { Children } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppSidebar from '../components/AppSidebar';

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <AppSidebar />
          <div className="main">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
