// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';
import counter from './counter';

const rootReducer = combineReducers({
  counter,
  router,
  form,
});

export default rootReducer;
