import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchPost from '../actions/action_post';
class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts : [],
    };
  }


  componentDidMount() {
    this.props.fetchPost();
  }

  render() {
    return (
      <div>

        {this.props.posts.success ? (
            this.props.posts.posts.map((post, idx) => {
              return (<a key={idx}>{post.title}</a>)
            })
          ) : (
            <h1>{this.props.posts.error}</h1>
          )
        }

      </div>
    )
  }
}
function mapStateToProps({ posts }) {
  console.log(posts);
  return { posts : posts };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
