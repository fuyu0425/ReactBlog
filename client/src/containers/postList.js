import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import fetchPost from '../actions/action_fetchpost';
import { getPost } from '../actions/action_post';
import sweetAlert from 'sweetalert';
class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts : [],
    };
  }


  componentDidMount() {
    this.props.getPost();
  }

  render() {
    const { posts, error, success }=this.props.post;
    return (
      <div>

        <ul className="list-group">
          {
            posts.map((post, idx) => {
              return (
                <li className="list-group-item"
                    key={idx}>{post.title}</li>)
            })
          }
        </ul>


      </div>
    )
  }
}
function mapStateToProps({ post }) {
  return { post };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
