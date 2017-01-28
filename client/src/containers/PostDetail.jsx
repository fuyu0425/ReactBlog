import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageHeader, Col } from 'react-bootstrap';
import MarkDownIt from 'markdown-it';
import mk from 'markdown-it-katex';
import { getPostDetail } from '../actions/action_post';

const md = new MarkDownIt('commonmark').use(mk);

class PostDetail extends Component {
  componentDidMount() {
    this.props.getPostDetail(this.props.params.id);
    console.log(this.props.params.id);
  }


  render() {
    const { post: { postDetail: { title, content } } } = this.props;
    const result = md.render(content);
    return (
      <div>
        <Col xs={12} md={8}>
          <PageHeader>{title}</PageHeader>
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: result }}
          />
        </Col>
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
