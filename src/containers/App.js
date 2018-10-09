// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import { bindActionCreators } from "redux";

import { actionCreators as authActions } from "../actions/auth";
import AppSidebar from "../components/AppSidebar/AppSidebar";
import AppMain from "./AppMain";
import Loading from "../components/Loading/Loading";

class App extends Component {
  static propTypes = {
    fetched: PropTypes.bool.isRequired,
    fetching: PropTypes.bool.isRequired,
    connected: PropTypes.bool.isRequired,
    connecting: PropTypes.bool.isRequired,
    timelineDisabled: PropTypes.bool.isRequired,
    resourcesDisabled: PropTypes.bool.isRequired,

    authActions: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.props.authActions.fetch();
  }

  render() {
    const {
      timelineDisabled,
      resourcesDisabled,
      connected,
      connecting,
      fetched,
      fetching
    } = this.props;

    if (!fetched || fetching || connecting) return <Loading />;

    return (
      <Router>
        <div className="app">
          <AppSidebar
            timelineDisabled={timelineDisabled}
            resourcesDisabled={resourcesDisabled}
          />
          <AppMain authed={connected} />
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
    connecting: server.connecting,
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
