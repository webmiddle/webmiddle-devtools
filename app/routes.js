/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import CounterPage from './containers/CounterPage';
import HomePage from './containers/HomePage';
import ResourcesPage from './containers/ResourcesPage';

export default () => (
  <App>
    <Switch>
      <Route path="/counter" component={CounterPage} />
      <Route path="/resources" component={ResourcesPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
