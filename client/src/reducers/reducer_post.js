import { FETCH_POST_SUCCESS, FETCH_POST_ERROR } from '../actions/action_post';

export default function (state = { posts : [], success : true }, action) {
  switch (action.type) {
    case FETCH_POST_SUCCESS:
      console.log('success');
      return { ...state, posts : action.payload.data, success : true };
    case FETCH_POST_ERROR:
      console.log('error');
      console.log(action);
      return { ...state, error : action.payload.message, success : false };
  }
  return state;
}
