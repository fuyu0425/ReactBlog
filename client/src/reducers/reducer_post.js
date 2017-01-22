import { FETCH_POST } from '../actions/action_post';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_POST:
      return [ ...action.payload.data, ...state ];
  }
  return state;
}
