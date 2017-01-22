import React, { Component } from 'react';
import TopBar from '../containers/topBar';
import PostList from '../containers/postList';
import 'bootstrap/dist/css/bootstrap.min.css';
export default class App extends Component {
  render() {
    return (
      <div className="container">
        <TopBar/>
        <h1 >Hi!</h1>
        <PostList/>
      </div>
    );
  }
}
