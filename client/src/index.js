import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import App from './components/app';
import reducers from './reducers';
import DevTools from './containers/DevTools';
import { browserHistory } from 'react-router'
import { Router, Route, Link, IndexRoute } from 'react-router'
import postList from './containers/postList';
import test from './components/test';
import CreatePost from './containers/createPost';
import Login from './containers/login';
import Frame from './containers/Frame';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
const middleware = [ ReduxThunk,
  promiseMiddleware,
  routerMiddleware(browserHistory) ];
const finalCreateStore = compose(
  applyMiddleware(...middleware),
  DevTools.instrument(),
)(createStore);

const store = finalCreateStore(reducers);
const history = syncHistoryWithStore(browserHistory, store);
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="" component={Frame}>
          <IndexRoute component={postList}/>
          <Route path="test" component={test}/>
          <Route path="create" component={CreatePost}/>
          <Route path="login" component={Login}/>
        </Route>
      </Route>

    </Router>
  </Provider>
  , document.querySelector('.root'));
