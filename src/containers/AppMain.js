/* eslint flowtype-errors/show-errors: 0 */
import React from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import classNames from "classnames";

import ConditionalRoute from "../components/ConditionalRoute";
import Loading from "../components/Loading/Loading";
import AuthPage from "./AuthPage";
import HomePage from "./HomePage";
import TimelinePage from "./TimelinePage";
import ResourcesPage from "./ResourcesPage";

const routes = [
  { path: "/", component: HomePage },
  { path: "/timeline", component: TimelinePage },
  { path: "/resources", component: ResourcesPage }
];

// render all components at once
// to keep them mounted in the DOM when switching routes
// for performance reasons
class AuthedArea extends React.Component {
  render() {
    return (
      <div>
        {routes.map(route => {
          const currentPath = window.location.hash.slice(1);
          const Component = route.component;
          const active = currentPath === route.path;
          return (
            <div key={route.path} className={classNames("route", { active })}>
              <Component />
            </div>
          );
        })}
      </div>
    );
  }
}

class AppMain extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    authed: PropTypes.bool.isRequired
  };

  render() {
    const { loading, authed } = this.props;

    if (loading) return <Loading />;

    return (
      <div className="main">
        <Switch>
          <ConditionalRoute
            allowed={!authed}
            redirect="/"
            path="/auth"
            component={AuthPage}
          />
          <ConditionalRoute
            allowed={authed}
            redirect="/auth"
            component={AuthedArea}
          />
        </Switch>
      </div>
    );
  }
}

export default AppMain;
