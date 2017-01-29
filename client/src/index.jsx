import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { browserHistory, Router } from 'react-router';
import routes from './routes';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import reducers from './reducers';
import DevTools from './containers/DevTools';

const initialState = window.__INITIAL_STATE__;
const middleware = [
  ReduxThunk,
  promiseMiddleware,
  routerMiddleware(browserHistory),
];
const finalCreateStore = compose(
  applyMiddleware(...middleware),
  DevTools.instrument())(createStore, initialState);

const store = finalCreateStore(reducers);
const history = syncHistoryWithStore(browserHistory, store);
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>
  , document.querySelector('.root'));
