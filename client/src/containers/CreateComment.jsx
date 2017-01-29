import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reset }from 'redux-form';
import CommentForm from './Form/CommentForm';
import { createComment, getPostDetail, init } from '../actions/action_post';
class CreateComment extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(value) {
    console.log(this.props);
    const { postId }=this.props;
    this.props.createComment(postId, value);
  }

  componentWillReceiveProps(props) {
    const { post:{ createCommentLoaded, createCommentSuccess } } = props;
    const { postId }=this.props;
    if (createCommentLoaded && createCommentSuccess) {
      this.props.reset('Comment');
      this.props.init();
      this.props.getPostDetail(postId);
    }
  }

  render() {
    return (<CommentForm onSubmit={this.handleSubmit}/>)
  }
}

function mapStateToProps({ post }) {
  return { post };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createComment,
    getPostDetail,
    init,
    reset
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateComment);
