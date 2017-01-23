import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchPost from '../actions/action_fetchpost';
import sweetAlert from 'sweetalert';
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
    const { posts, error, success }=this.props.posts;
    return (
      <div>

        {(success) ? (
            <ul className="list-group">{
              posts.map((post, idx) => {
                return (
                  <li className="list-group-item" key={idx}>{post.title}</li>)
              })
            }
            </ul>
          ) : (
            sweetAlert({
              title : "Loading Fail",
              type : "error"
            })
          )
        }

      </div>
    )
  }
}
function mapStateToProps({ fetchposts }) {
  console.log(fetchposts);
  return { posts : fetchposts };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPost }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
