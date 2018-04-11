// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import server from './server';
import timeline from './timeline';
import resources from './resources';
import logger from './logger';

const rootReducer = combineReducers({
  router,
  form,

  server,
  timeline,
  resources,
  logger,
});

export default rootReducer;
