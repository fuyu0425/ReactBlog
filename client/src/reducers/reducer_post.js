import {
  handleActions
} from 'redux-actions';
import swal from 'sweetalert';
const initialState = {
  posts : [],
  loaded : false
};
import { push } from 'react-router-redux';

export default handleActions({
  GET_POST : {
    next(state, action) {
      console.log(action);
      return {
        ...state,
        posts : action.payload.data
      };
    },
    throw(state, action) {
      swal({
        title : "Loading Fail",
        type : "error"
      });
      return {
        ...state,
        posts : []
      };
    },
  },
  CREATE_POST : {
    next(state, action) {
      console.log(action);
      return {
        ...state,
        success : true,
        loaded : true
      };
    },
    throw(state, action) {
      swal({
        title : "Creating Fail",
        type : "error"
      });
      return {
        ...state,
        success : false,
        loaded : true
      };
    },
  }
}, initialState);
