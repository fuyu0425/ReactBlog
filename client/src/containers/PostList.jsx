import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getPostList } from '../actions/action_post';

class PostList extends Component {
  componentDidMount() {
    this.props.getPostList();
  }

  render() {
    const { posts } = this.props.post;
    return (
      <div>
        <ListGroup>
          {
            posts.map((post) => {
              return (
                <LinkContainer to={`/article/${post.id}`} key={post.id}>
                  <ListGroupItem>
                    {post.title}
                  </ListGroupItem>
                </LinkContainer>
              );
            })
          }
        </ListGroup>

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

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
