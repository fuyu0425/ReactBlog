import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import post from './reducer_post';
import user from './reducer_user';

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  post,
  user,
});

export default rootReducer;
