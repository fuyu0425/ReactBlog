import React, { Component } from 'react';
import LoginForm from './loginForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sweetAlert from 'sweetalert';
import { login } from '../actions/action_user';
import { push } from 'react-router-redux';
export class Login extends Component {
  handleSubmit = (value) => {
    this.props.login(value);
  };

  componentWillReceiveProps(props) {
    const { user:{ loaded, success } }=props;
    if (loaded && success) {
      this.props.push('/');
    }
  }

  render() {
    return (
      <LoginForm onSubmit={this.handleSubmit}/>
    )
  }
}

function mapStateToProps({ user }) {
  return { user };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login, push }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


