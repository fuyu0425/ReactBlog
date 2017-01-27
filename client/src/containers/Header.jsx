import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators }from 'redux';
import { logout } from '../actions/action_user';
import {
  Button,
  Navbar,
  Nav,
  NavItem,
  MenuItem,
  NavDropdown,
} from 'react-bootstrap';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap'
class Header extends Component {
  render() {
    const { user, logout }=this.props;
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
          <Nav >
            {
              (user.verified && !user.tokenError) ? [
                  <LinkContainer key="create post"
                                 to={'/create/'}>
                    <NavItem>Create Post</NavItem>
                  </LinkContainer>
                  ,
                  <NavItem key="logout"
                           onClick={logout}>
                    Logout
                  </NavItem>

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
  return bindActionCreators({ logout }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);

