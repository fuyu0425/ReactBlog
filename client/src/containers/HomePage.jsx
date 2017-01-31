import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { ListGroup, ListGroupItem, Button, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Helmet from 'react-helmet';
import { getPostList ,selectPage} from '../actions/action_post';
import PageBar from '../components/PageBar';
class HomePage extends Component {
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
      this.props.getPostList({page:nowPage,per:5});
      this.nowPage=nowPage;
    }
  }
  render() {
    const { posts ,nowPage,totalPage} = this.props.post;
    const {selectPage} = this.props;

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
        <PageBar nowPage={nowPage} totalPage={totalPage} selectPage={selectPage}/>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ post }) {
  return { post };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPostList,selectPage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
