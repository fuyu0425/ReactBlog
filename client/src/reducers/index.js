import { combineReducers } from 'redux';
import post from './reducer_post';
import { reducer as formReducer } from 'redux-form';
import{ routerReducer } from 'react-router-redux';
const rootReducer = combineReducers({
    routing : routerReducer,
    post,
    form : formReducer
  })
  ;

export default rootReducer;
