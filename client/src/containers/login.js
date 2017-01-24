import React, { Component } from 'react';
import LoginForm from './loginForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sweetAlert from 'sweetalert';
import login from '../actions/action_login';
export class Login extends Component {
    handleSubmit = (value) => {
        this.props.login(value);
    };

    render() {
        return (
            <LoginForm onSubmit={this.handleSubmit}/>
        )
    }
}

function mapStateToProps({ login }) {
    return { login };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ login }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);


