import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getPostList } from '../actions/action_post';

class PostList extends Component {
  componentDidMount() {
    const { posts } = this.props.post;
    if (!posts.length)
      this.props.getPostList();
  }

  render() {
    const { posts } = this.props.post;
    const { verified } = this.props.user;
    return (
      <div>
        <ListGroup>
          {
            posts.map((post) => {
              return (
                <ListGroupItem key={post.id}>
                  <Link to={`/article/${post.id}`}>
                    {post.title}
                  </Link>
                  {verified && (
                    <LinkContainer to={`/edit/${post.id}`}>
                      <Button bsSize="small">Edit</Button>
                    </LinkContainer>
                  )}
                </ListGroupItem>
              );
            })
          }
        </ListGroup>

      </div>
    );
  }
}
function mapStateToProps({ user, post }) {
  return { user, post };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPostList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
