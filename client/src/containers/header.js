import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators }from 'redux';
import { logout } from '../actions/action_user';
class Header extends Component {
  render() {
    const { user, logout }=this.props;
    return (
      <nav className="navbar navbar-default">
        <div className="navbar-header">
          <IndexLink className="btn btn-default" to={'/'}
                     role="button">Home</IndexLink>
        </div>
        <ul className="nav navbar-nav">
          <Link className="btn btn-default" to={'/create/'}
                role="button">Create Post</Link>
          {
            user.verified ? (
                <button onClick={logout}>Logout</button>
              ) : (
                <Link className="btn btn-default" to={'/login/'}
                      role="button">Login</Link>
              )
          }
        </ul>
      </nav>
    )
  }
}
;
function mapStateToProps({ user }) {
  console.log(user);
  return { user };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

