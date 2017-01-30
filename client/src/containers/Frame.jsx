import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageHeader, Col, Row, Grid } from 'react-bootstrap';
import swal from 'sweetalert';
import Header from './Header';
import { verifyToken } from '../actions/action_user';
import config from '../../config';
class Frame extends Component {
  componentDidMount() {
    console.log(config.apiServer);
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
        <Row className="show-grid">
          <Col xs={8} md={8} style={{ margin: '0 auto', float: 'none' }}>
            <Header/>
            {this.props.children}
          </Col>
        </Row>
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
