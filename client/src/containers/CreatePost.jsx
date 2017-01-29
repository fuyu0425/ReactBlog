import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { push } from 'react-router-redux';
import { createPost, init } from '../actions/action_post';
import PostForm from './Form/CreatePostForm';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  componentDidMount() {
    const { user } = this.props;
    if (!user.verified || (user.verified && user.tokenError)) {
      swal({ title: 'it need to be admin', type: 'error' });
      this.props.push('/');
    }
  }

  componentWillReceiveProps(props) {
    const { user: { verified, tokenError }, post: { loaded, success } } = props;
    if (loaded && success) {
      this.props.init();
      this.props.push('/');
    }
    if (!verified || (verified && tokenError)) {
      this.props.init();
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
  return bindActionCreators({ createPost, init, push }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
