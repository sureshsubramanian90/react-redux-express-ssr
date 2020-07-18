/* eslint-disable no-underscore-dangle */
// Startup point for client-side application

import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './containers/App';

ReactDOM.hydrate(
  <Provider store={store}>
      <App />
  </Provider>,
  document.querySelector('#root')
);
