import { handleActions } from 'redux-actions';
import swal from 'sweetalert';

const initialState = {
  token: {},
  verified: false,
  success: false,
  loaded: false,
  tokenError: false,
};

export default handleActions({
  GET_USER: {
    next(state, action) {
      console.log(action);
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
  CREATE_USER: {
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
        loaded: true,
      };
    },
  },
  LOGIN: {
    next(state, action) {
      return {
        ...state,
        token: action.payload.data.token,
        verified: true,
        success: true,
        loaded: true,
        tokenError: false,
      };
    },
    throw(state) {
      swal({
        title: 'Login Fail',
        type: 'error',
      });
      return {
        ...state,
        verified: true,
        success: false,
        loaded: true,
        tokenError: false,
      };
    },
  },
  LOGOUT: {
    next(state) {
      return {
        ...state,
        token: {},
        verified: false,
        tokenError: false,
      };
    },
    throw(state) {
      return {
        ...state,
        token: {},
        verified: false,
        tokenError: false,
      };
    },
  },
  VERIFY_TOKEN: {
    next(state) {
      return {
        ...state,
        verified: true,
        tokenError: false,
      };
    },
    throw(state) {
      localStorage.removeItem('token');
      return {
        ...state,
        verified: true,
        tokenError: true,
      };
    },
  },
}, initialState);
