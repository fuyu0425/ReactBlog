import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Button,Row,Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { getPostList,selectPage } from '../actions/action_post';
import PageBar from '../components/PageBar';
class PostList extends Component {
  constructor(props){
    super(props);
    this.nowPage=undefined;
  }
  componentDidMount() {
    this.props.selectPage(1);
  }
  componentWillReceiveProps(props){
    const { nowPage } = props.post;
    if(nowPage!=this.nowPage){
      this.props.getPostList({page:nowPage,per:30});
      this.nowPage=nowPage;
    }
  }

  render() {
    const { posts,nowPage,totalPage } = this.props.post;
    const { verified } = this.props.user;
    const {selectPage} = this.props;
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
          <PageBar nowPage={nowPage} totalPage={totalPage} selectPage={selectPage}/>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ user, post }) {
  return { user, post };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPostList,selectPage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
