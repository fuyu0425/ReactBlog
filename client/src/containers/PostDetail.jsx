import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageHeader } from 'react-bootstrap';
import { getPostDetail } from '../actions/action_post';

class PostDetail extends Component {
  componentDidMount() {
    this.props.getPostDetail(this.props.params.id);
    console.log(this.props.params.id);
  }

  render() {
    console.log('props is', this.props);
    const { post: { postDetail: { title, content } } } = this.props;
    return (
      <div>
        <PageHeader>{title}</PageHeader>
        {content}
      </div>
    );
  }
}


function mapStateToProps({ post }) {
  console.log(post);
  return { post };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPostDetail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
