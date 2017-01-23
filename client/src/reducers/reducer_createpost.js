import {
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR
} from '../actions/action_createpost';

export default function (state = { posts : {}, success : true }, action) {
  switch (action.type) {
    case CREATE_POST_SUCCESS:
      return { ...state, posts : action.payload, success : true };
    case CREATE_POST_ERROR:
      return { ...state, error : action.payload, success : false };
  }
  return state;
}
