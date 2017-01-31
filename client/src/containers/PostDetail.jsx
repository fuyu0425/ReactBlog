import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PageHeader, Col, Row, Grid } from 'react-bootstrap';
import Helmet from 'react-helmet';
import MarkDownIt from 'markdown-it';
import hl from 'markdown-it-highlightjs';
import mk from 'markdown-it-katex';
import { getPostDetail } from '../actions/action_post';
import CreateComment from './CreateComment';
const md = new MarkDownIt('commonmark').use(mk).use(hl);

class PostDetail extends Component {
  componentDidMount() {
    const {id} =this.props.params;
    this.props.getPostDetail(id);
  }


  render() {
    const { post: { postDetail: { title, content, comments,summary } } } = this.props;
    const result = md.render(content);
    return (
      <div className="main">
        <Helmet
          title={title}
          titleTemplate="%s - Leo's Blog"
          meta={[
            {name:'author',content:'Leo'},
            {property:'og:title',content:`${title} - Leo's Blog`},
            {property:'og:description',content:summary}
          ]}
        />
        <div className="post-block">
          <article>
          <header>
            <h1 className="title">
                {title}
            </h1>
          </header>
          <section
            className="markdown-body content"
            dangerouslySetInnerHTML={{ __html: result }}
          />
          </article>
        </div>
        <div className="comments">
          <h4>Comments</h4>
          <CreateComment postId={this.props.params.id}/>
          { comments.length ? (
              comments.map(comment => (
                <div key={comment.id} className="comment">
                    <span
                      style={{ color: 'blue' }}>
                      {comment.author}:&nbsp;
                    </span>
                  <span>{comment.content}</span>
                  <hr/>
                </div>
              ))
            ) : (<div>No comment</div>)
          }
        </div>
      </div>
    );
  }
}


function mapStateToProps({ post }) {
  return { post };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPostDetail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
