import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import PostList from './containers/PostList';
import PostDetail from './containers/PostDetail';
import CreatePost from './containers/CreatePost';
import UpdatePost from './containers/UpdatePost';
import login from './containers/Login';
import Frame from './containers/Frame';
import HomePage from './containers/HomePage';

export default (
  <Route path="/" component={App}>
    <Route path="" component={Frame}>
      <IndexRoute component={HomePage}/>
      <Route path="postlist" component={PostList}/>
      <Route path="create" component={CreatePost}/>
      <Route path="login" component={login}/>
      <Route path="article/:id" component={PostDetail}/>
      <Route path="edit/:id" component={UpdatePost}/>
    </Route>
  </Route>

)
