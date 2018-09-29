// @flow
import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppSidebar from "./AppSidebar/AppSidebar";

export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="app">
          <AppSidebar />
          <div className="main">{this.props.children}</div>
        </div>
      </MuiThemeProvider>
    );
  }
}
