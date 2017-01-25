import React, { Component } from 'react';
import Header from './header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { verifyToken } from '../actions/action_user';
class Frame extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.props.verifyToken({ token });
    }
  }

  render() {
    const { user }=this.props;
    return (
      <div>
        <Header/>
        {/*user.verified ? (<div>logged</div>) : (<div>unlogged</div>)*/}
        {this.props.children}
      </div>
    )
  }
}
function mapStateToProps({ user }) {
  return { user };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ verifyToken }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Frame);
