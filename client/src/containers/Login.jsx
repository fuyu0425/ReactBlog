import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import swal from 'sweetalert';
import LoginForm from './Form/LoginForm';
import { login } from '../actions/action_user';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const token = window.localStorage.getItem('token');
    if (token) {
      swal({
        title: 'Has logged',
        type: 'info',
      });
      this.props.push('/');
    }
  }

  componentWillReceiveProps(props) {
    const { user: { loaded, success, token } } = props;
    if (loaded && success) {
      window.localStorage.setItem('token', token);
      console.log(window.localStorage.getItem('token'));
      this.props.push('/');
    }
  }


  handleSubmit(value) {
    this.props.login(value);
  }


  render() {
    return (
      <LoginForm onSubmit={this.handleSubmit}/>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login, push }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
