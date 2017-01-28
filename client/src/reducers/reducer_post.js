import { handleActions } from 'redux-actions';
import swal from 'sweetalert';


const initialState = {
  posts: [],
  postDetail: { title: '', content: '', summary: '' },
  loaded: false,
};

export default handleActions({
  GET_POST_LIST: {
    next(state, action) {
      console.log('get list');
      return {
        ...state,
        posts: action.payload.data,
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
}, initialState);
