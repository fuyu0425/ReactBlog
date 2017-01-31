import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageHeader, Col, Row, Grid } from 'react-bootstrap';
import Helmet from "react-helmet";
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
        <Helmet
          htmlAttributes={{lang: "en", amp: undefined}}
          defaultTitle="Leo's Blog"
          meta={[
            {name:'author',content:'Leo'},
          ]}
        />
        <Row className="show-grid">
          <Header/>
          <Col xs={8} md={8} style={{ margin: '0 auto', float: 'none' }}>
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
