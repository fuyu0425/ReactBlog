import { handleActions } from 'redux-actions';
import swal from 'sweetalert';


const initialState = {
  posts: [],
  nowPage:1,
  totalPage:1,
  postDetail: { title: '', content: '', summary: '', comments: [] },
  success: true,
  loaded: false,
  createCommentLoaded: false,
  createCommentSuccess: false,
};

export default handleActions({
  GET_POST_LIST: {
    next(state, action) {
      console.log('get list');
      console.log(action.payload.data);
      return {
        ...state,
        posts: action.payload.data.items,
        totalPage:action.payload.data.totalpage
      };
    },
    throw(state) {
      swal({
        title: 'Loading Fail',
        type: 'error',
      });
      return {
        ...state,
        posts: [],
      };
    },
  },
  GET_POST_DETAIL: {

    next(state, action) {
      console.log('get detail');
      console.log(action.payload.data);
      return {
        ...state,
        postDetail: action.payload.data,
      };
    },
    throw(state) {
      swal({
        title: 'Loading Fail',
        type: 'error',
      });
      return {
        ...state,
        postDetail: { title: '', content: '', summary: '' },
      };
    },
  },
  CREATE_POST: {
    next(state) {
      return {
        ...state,
        success: true,
        loaded: true,
      };
    },
    throw(state) {
      swal({
        title: 'Creating Fail',
        type: 'error',
      });
      return {
        ...state,
        success: false,
        loaded: false,
      };
    },
  },
  UPDATE_POST: {
    next(state) {
      return {
        ...state,
        success: true,
        loaded: true,
      };
    },
    throw(state) {
      swal({
        title: 'Updating Fail',
        type: 'error',
      });
      return {
        ...state,
        success: false,
        loaded: false,
      };
    },
  },
  CREATE_COMMENT: {
    next(state){
      return {
        ...state,
        createCommentLoaded: true,
        createCommentSuccess: true
      }
    },
    throw(state){
      swal({
        title: "Create Comment Fail",
        type: 'error'
      });
      return {
        ...state,
        createCommentLoaded: true,
        createCommentSuccess: false
      }
    },
  },
  SELECT_PAGE:{
    next(state,action){
      return {
        ...state,
        nowPage:action.payload
      };
    },
  },
  INIT: {
    next(state) {
      return {
        ...state,
        success: true,
        loaded: false,
        createCommentLoaded: false,
        createCommentSuccess: false,
      };
    },
  },
}, initialState);
