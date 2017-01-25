import React, { Component } from 'react';
import PostList from '../containers/postList';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert/dist/sweetalert.css';
import DevTools from '../containers/DevTools';
export default class App extends Component {
  render() {
    return (
      <div className="container">
        {this.props.children}
        {(process.env.NODE_ENV == 'development') ? (
            <DevTools/>) : (null)}
      </div>
    );
  }
}
