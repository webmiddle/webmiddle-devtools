/* eslint flowtype-errors/show-errors: 0 */
import React from "react";
import { Route } from "react-router";
import classNames from "classnames";
import App from "./containers/App";
import HomePage from "./containers/HomePage";
import TimelinePage from "./containers/TimelinePage";
import ResourcesPage from "./containers/ResourcesPage";

const routes = [
  { path: "/", component: HomePage },
  { path: "/timeline", component: TimelinePage },
  { path: "/resources", component: ResourcesPage }
];

export default () => (
  <App>
    <Route>
      <div>
        {routes.map((route, i) => {
          const currentPath = window.location.hash.slice(1);
          const Component = route.component;
          const active = currentPath === route.path;
          return (
            <div key={i} className={classNames("route", { active })}>
              <Component />
            </div>
          );
        })}
      </div>
    </Route>
  </App>
);
