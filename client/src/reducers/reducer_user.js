import {
  handleActions
} from 'redux-actions';
import swal from 'sweetalert';
const initialState = {
  token : {},
  success : false,
  loaded : false
};

export default handleActions({
  GET_USER : {
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
  CREATE_USER : {
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
  },
  LOGIN : {
    next(state, action) {
      console.log(action);
      return {
        ...state,
        token : action.payload.data.token,
        success : true,
        loaded : true
      };
    },
    throw(state, action) {
      swal({
        title : "Login Fail",
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
