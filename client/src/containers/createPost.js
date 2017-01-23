import React, { Component } from 'react';
import PostForm from './postForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import sweetAlert from 'sweetalert';
import createPost from '../actions/action_createpost';
export class CreatePost extends Component {
  handleSubmit = (value) => {
    this.props.createPost(value);
  };

  render() {
    return (
      <PostForm onSubmit={this.handleSubmit}/>
    )
  }
}

function mapStateToProps({ createposts }) {
  console.log(createposts);
  return { createposts : createposts };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createPost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);


