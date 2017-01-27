import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import swal from 'sweetalert';
import Header from './Header';
import { verifyToken } from '../actions/action_user';

class Frame extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.verifyToken({ token });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (user.tokenError) {
      localStorage.removeItem('token');
      swal({
        title: 'Verify Token Error',
        type: 'error',
      });
    }
  }


  render() {
    return (
      <div>
        <Header/>
        {this.props.children}
      </div>
    );
  }
}
function mapStateToProps({ user }) {
  return { user };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ verifyToken }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Frame);
