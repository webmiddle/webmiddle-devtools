/* eslint flowtype-errors/show-errors: 0 */
import React from "react";
import { Route } from "react-router-dom";
import classNames from "classnames";
import HomePage from "./HomePage";
import TimelinePage from "./TimelinePage";
import ResourcesPage from "./ResourcesPage";

const routes = [
  { path: "/", component: HomePage },
  { path: "/timeline", component: TimelinePage },
  { path: "/resources", component: ResourcesPage }
];

export default () => (
  <div className="main">
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
  </div>
);
