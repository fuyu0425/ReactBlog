import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Pagination} from 'react-bootstrap';

class PageBar extends Component {
  render()
  {
    const {nowPage,totalPage,selectPage} =this.props;
    console.log(this.props);
    return(
      <Pagination
        prev
        next
        first
        last
        ellipsis
        boundaryLinks
        items={totalPage}
        maxButtons={5}
        activePage={nowPage}
        onSelect={e=>{window.scrollTo(0, 0);selectPage(e);}}
      />
    )
  }
}




export default PageBar;
