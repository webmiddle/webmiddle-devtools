// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import { bindActionCreators } from "redux";

import { actionCreators as authActions } from "../actions/auth";
import { actionCreators as serverActions } from "../actions/server";
import AppSidebar from "../components/AppSidebar/AppSidebar";
import AppMain from "./AppMain";
import { emitter as serverEmitter } from "../services/server";

class App extends Component {
  static propTypes = {
    fetched: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    connected: PropTypes.bool.isRequired,
    evaluationDisabled: PropTypes.bool.isRequired,
    timelineDisabled: PropTypes.bool.isRequired,
    resourcesDisabled: PropTypes.bool.isRequired,

    authActions: PropTypes.object.isRequired,
    serverActions: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.props.authActions.fetch();

    serverEmitter.on("close", () => {
      this.props.authActions.logout();
    });

    serverEmitter.on("notification", message => {
      this.props.serverActions.notification({ message });
    });
  }

  render() {
    const {
      evaluationDisabled,
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
            evaluationDisabled={evaluationDisabled}
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
    evaluationDisabled: false, // TODO
    timelineDisabled: timeline.nodeList.length === 0,
    resourcesDisabled: resources.nodeList.length === 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    serverActions: bindActionCreators(serverActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
