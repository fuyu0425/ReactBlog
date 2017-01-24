import React, { Component } from 'react';
import PostForm from './postForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { createPost } from '../actions/action_post';
import { push } from 'react-router-redux';
export class CreatePost extends Component {
  handleSubmit = (value) => {
    this.props.createPost(value);
  };

  componentWillReceiveProps(props) {
    const { post:{ loaded, success } }=props;
    if (loaded && success) {
      this.props.push('/');
    }
  }


  render() {
    return (
      <PostForm onSubmit={this.handleSubmit} on/>
    )
  }
}

function mapStateToProps({ post }) {
  console.log(post);
  return { post };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createPost, push }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);


