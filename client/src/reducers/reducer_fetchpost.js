  import {
    FETCH_POST_SUCCESS,
    FETCH_POST_ERROR
  } from '../actions/action_fetchpost';

  export default function (state = { posts : [], success : true }, action) {
    switch (action.type) {
      case FETCH_POST_SUCCESS:
        return { ...state, posts : action.payload, success : true };
      case FETCH_POST_ERROR:
        return { ...state, error : action.payload, success : false };
    }
    return state;
  }
