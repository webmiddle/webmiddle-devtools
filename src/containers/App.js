// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import { bindActionCreators } from "redux";

import { actionCreators as authActions } from "../actions/auth";
import AppSidebar from "../components/AppSidebar/AppSidebar";
import AppMain from "./AppMain";
import { emitter as serverEmitter } from "../services/server";

class App extends Component {
  static propTypes = {
    fetched: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    connected: PropTypes.bool.isRequired,
    timelineDisabled: PropTypes.bool.isRequired,
    resourcesDisabled: PropTypes.bool.isRequired,

    authActions: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.props.authActions.fetch();

    serverEmitter.on("close", () => {
      this.props.authActions.logout();
    });
  }

  render() {
    const {
      timelineDisabled,
      resourcesDisabled,
      connected,
      fetched,
      fetching
    } = this.props;

    const loading = !fetched || fetching;

    return (
      <Router>
        <div className="app">
          <AppSidebar
            timelineDisabled={timelineDisabled}
            resourcesDisabled={resourcesDisabled}
          />
          <AppMain loading={loading} authed={connected} />
        </div>
      </Router>
    );
  }
}

function mapStateToProps({ auth, server, timeline, resources }) {
  return {
    fetched: auth.fetched,
    fetching: auth.fetching,
    connected: server.connected,
    timelineDisabled: timeline.callState.length === 0,
    resourcesDisabled: resources.nodeList.length === 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
