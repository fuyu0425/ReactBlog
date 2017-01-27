import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { push } from 'react-router-redux';
import { createPost } from '../actions/action_post';
import PostForm from './PostForm';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    const { post: { loaded, success }, user } = this.props;
    if (!user.verified || (user.verified && user.tokenError)) {
      swal({ title: 'it need to be admin', type: 'error' });
      this.props.push('/');
    }
    if (loaded && success) {
      this.props.push('/');
    }
  }

  componentWillReceiveProps(props) {
    const { user } = props;
    if (!user.verified || (user.verified && user.tokenError)) {
      this.props.push('/');
    }
  }

  handleSubmit(value) {
    this.props.createPost(value);
  }

  render() {
    return (
      <PostForm onSubmit={this.handleSubmit}/>
    );
  }
}

function mapStateToProps({ user, post }) {
  return { user, post };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createPost, push }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
