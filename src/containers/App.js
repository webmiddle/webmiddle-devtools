// @flow
import React, { Component } from "react";
import AppSidebar from "./AppSidebar/AppSidebar";
import AppMain from "./AppMain";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <AppSidebar />
        <AppMain />
      </div>
    );
  }
}
