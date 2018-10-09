import React from "react";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends React.Component {
  renderRoute = routeProps => {
    const { allowed, redirect, component: Component } = this.props;
    if (allowed) return <Component {...routeProps} />;
    return (
      <Redirect
        to={{
          pathname: redirect,
          state: { from: routeProps.location }
        }}
      />
    );
  };

  render() {
    const { component: Component, allowed, ...rest } = this.props;
    return <Route {...rest} render={this.renderRoute} />;
  }
}

export default PrivateRoute;
