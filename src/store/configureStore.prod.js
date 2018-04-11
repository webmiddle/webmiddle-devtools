// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import promiseMiddleware from './promiseMiddleware';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const promise = promiseMiddleware();
const enhancer = applyMiddleware(thunk, router, promise);

function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}

export { configureStore, history };
