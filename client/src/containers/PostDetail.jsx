import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageHeader, Col, Row, Grid } from 'react-bootstrap';
import MarkDownIt from 'markdown-it';
import hl from 'markdown-it-highlightjs';
import mk from 'markdown-it-katex';
import { getPostDetail } from '../actions/action_post';
import CreateComment from './CreateComment';
const md = new MarkDownIt('commonmark').use(mk).use(hl);

class PostDetail extends Component {
  componentDidMount() {
    this.props.getPostDetail(this.props.params.id);
    console.log(this.props.params.id);
  }


  render() {
    const { post: { postDetail: { title, content, comments } } } = this.props;
    const result = md.render(content);
    return (
      <div>
        <Row className="show-grid">
          <Col xs={8} md={8} style={{ margin: '0 auto', float: 'none' }}>
            <PageHeader>{title}</PageHeader>
            <div
              className="markdown-body"
              dangerouslySetInnerHTML={{ __html: result }}
            />
            <h4>Comments</h4>
            <CreateComment postId={this.props.params.id}/>
            { comments.length ? (
                comments.map(comment => (
                  <div key={comment.id}>
                    {comment.author}
                    {comment.content}
                  </div>
                ))
              ) : (<div>No comment</div>)
            }
          </Col>
        </Row>
      </div>
    );
  }
}


function mapStateToProps({ post }) {
  console.log(post);
  return { post };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPostDetail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
