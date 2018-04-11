import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

ReactDOM.render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
registerServiceWorker();
