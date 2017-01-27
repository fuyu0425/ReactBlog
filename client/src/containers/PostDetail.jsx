import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageHeader } from 'react-bootstrap';
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
        <PageHeader>{title}</PageHeader>
        <div dangerouslySetInnerHTML={{ __html: result }}/>
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
