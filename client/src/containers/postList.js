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


  componentWillMount() {
    this.props.fetchPost();
  }

  render() {
    return (
      <div>
        {
          this.props.posts.map((post, idx) => {
            return (<a key={idx}>{post.title}</a>)
          })
        }
      </div>
    )
  }
}
function mapStateToProps({ posts }) {
  console.log(posts);
  return { posts : posts }; // weather:weather
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
