import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Button, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Helmet from 'react-helmet';
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
      <div className="main">
        <Helmet
          title="Homepage"
          titleTemplate="%s - Leo's Blog"
          meta={[
            {name:'author',content:'Leo'},
            {property:'og:title',content:'Leo\'s Blog'},
            {property:'og:description',content:'Leo\'s Blog'}
          ]}
        />
        {
          posts.map((post) => {
            return (
              <article key={post.id} className="post-block">

                <header>
                  <h1 className="title">
                    <Link to={`/article/${post.id}`}>
                    {post.title}
                    </Link>
                  </h1>
                </header>
                  <section className="update-date">
                    <i className="fa fa-calendar"/>
                    <time dateTime={post.updated}>{post.updated}</time>
                  </section>
                  <section className="summary">
                      <p>{post.summary}</p>
                  </section>
                  <footer className="readmore">
                    <Link  to={`/article/${post.id}`}>
                      Read More .....
                    </Link>
                  </footer>
                <hr/>
              </article>
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
