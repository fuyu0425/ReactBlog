import {
  handleActions
} from 'redux-actions';
import swal from 'sweetalert';
const initialState = {
  token : {},
  verified : false,
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
      return {
        ...state,
        token : action.payload.data.token,
        verified : true,
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
        verified : true,
        success : false,
        loaded : true
      };
    },
  },
  LOGOUT : {
    next(state, action) {
      return {
        ...state,
        token : {},
        verified : false
      };
    },
    throw(state, action) {
      return {
        ...state,
        token : {},
        verified : false
      };
    },
  },
  VERIFY_TOKEN : {
    next(state, action){
      return {
        ...state,
        verified : true
      };
    },
    throw(state, action){
      swal({
        title : "Verify Token Error",
        type : "error"
      });
      localStorage.removeItem('token');
      return {
        ...state,
        verified : false
      };
    }
  }
}, initialState);
