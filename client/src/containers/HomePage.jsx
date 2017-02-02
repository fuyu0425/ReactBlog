import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import {push} from 'react-router-redux';
import { ListGroup, ListGroupItem, Button, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Helmet from 'react-helmet';
import { getPostList} from '../actions/action_post';
import PageBar from '../components/PageBar';
class HomePage extends Component {
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
    this.props.push(`/page/${value}`);
    this.props.getPostList({page:value,per:5});
    this.setState({nowPage:Number(value)});
  }
  render() {
    const { posts,totalPage} = this.props.post;

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
        <div className="page-bar">
        <PageBar nowPage={Number(this.state.nowPage)} totalPage={totalPage} selectPage={this.selectPage}/>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ post }) {
  return { post };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPostList,push }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
