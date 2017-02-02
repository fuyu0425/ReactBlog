import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import {push} from 'react-router-redux';
import { ListGroup, ListGroupItem, Button,Row,Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getPostList,selectPage } from '../actions/action_post';
import PageBar from '../components/PageBar';
class PostList extends Component {
  constructor(props){
    super(props);
    this.state={nowPage:Number(1)};
    this.selectPage=this.selectPage.bind(this);
  }
  componentDidMount() {
    let {page} =this.props.params;
    if(!page) page=1;
    this.setState({nowPage:page});
    this.props.getPostList({page:page,per:5});
  }
  selectPage(value){
    this.props.push(`/postlist/${value}`);
    this.props.getPostList({page:value,per:5});
    this.setState({nowPage:Number(value)});
  }

  render() {
    const { posts,totalPage } = this.props.post;
    const { verified } = this.props.user;
    return (
      <div>
        <ListGroup>
          {
            posts.map((post) => {
              return (
                <ListGroupItem key={post.id}>
                  <Row>

                    <Col md={6} className="text-left">
                      <Link to={`/article/${post.id}`}>{post.title}</Link>
                    </Col>

                    <Col md={6} className="text-right">
                      {post.updated}
                    </Col>
                  </Row>

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
        <div className="page-bar">
          <PageBar nowPage={Number(this.state.nowPage)} totalPage={totalPage} selectPage={this.selectPage}/>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ user, post }) {
  return { user, post };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPostList,push }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
