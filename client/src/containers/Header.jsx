import React, { Component } from 'react';
import { IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import * as UserActions from '../actions/action_user';

class Header extends Component {
  render() {
    const { user, logout } = this.props;
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <IndexLink to="/">
              Home
            </IndexLink>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            {(user.verified && !user.tokenError)
              ? [
                <LinkContainer
                  key="create post"
                  to={'/create/'}
                >
                  <NavItem>Create Post</NavItem>
                </LinkContainer>,
                <NavItem
                  key="logout"
                  onClick={logout}
                >
                  Logout
                </NavItem>,
              ] : (
                <LinkContainer to={'/login/'}>
                  <NavItem>
                    Login
                  </NavItem>
                </LinkContainer >
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps({ user }) {
  return { user };
}
function mapDispatchToProps(dispatch) {
  const { logout } = UserActions;
  return bindActionCreators({ logout }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

