// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import counter from './counter';
import server from './server';
import resources from './resources';
import logger from './logger';

const rootReducer = combineReducers({
  router,
  form,

  counter,
  server,
  resources,
  logger,
});

export default rootReducer;
