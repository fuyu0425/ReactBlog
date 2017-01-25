import React, { Component } from 'react';
import LoginForm from './loginForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sweetAlert from 'sweetalert';
import { login } from '../actions/action_user';
import { push } from 'react-router-redux';
import swal from 'sweetalert';
export class Login extends Component {
  handleSubmit = (value) => {
    this.props.login(value);
  };

  componentWillMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      swal({
        title : "Has logged",
        type : "info"
      });
      this.props.push('/');
    }
  }

  componentWillReceiveProps(props) {
    const { user:{ loaded, success, token } }=props;
    if (loaded && success) {
      window.localStorage.setItem('token', token);
      console.log(window.localStorage.getItem('token'));
      this.props.push('/');
    }
  }

  render() {
    return (
      <LoginForm onSubmit={this.handleSubmit}/>
    )
  }
}

function

mapStateToProps({ user }) {
  return { user };
}

function

mapDispatchToProps(dispatch) {
  return bindActionCreators({ login, push }, dispatch);
}

export
default

connect(mapStateToProps, mapDispatchToProps)

(
  Login
)
;


