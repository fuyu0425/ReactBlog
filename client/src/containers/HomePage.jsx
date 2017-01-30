import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Button, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getPostList } from '../actions/action_post';

class HomePage extends Component {
  componentDidMount() {
    const { posts } = this.props.post;
    if (!posts.length)
      this.props.getPostList();
  }

  render() {
    const { posts } = this.props.post;
    return (
      <div className="homepage">
        {
          posts.map((post) => {
            return (
              <div key={post.id} className="post-block">
                <div className="update-date">{post.updated}</div>
                <LinkContainer to={`/article/${post.id}`}>
                  <div className="title">
                    <a>
                    {post.title}
                    </a>
                  </div>
                </LinkContainer>
                <p>{post.summary}</p>
                <Link to={`/article/${post.id}`}>
                  Read More .....
                </Link>
              </div>
            );
          })
        }
      </div>
    );
  }
}
function mapStateToProps({ post }) {
  return { post };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPostList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
