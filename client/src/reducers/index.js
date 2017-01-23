import { combineReducers } from 'redux';
import FetchPostReducer from './reducer_fetchpost';
import CreatePostReudcer from './reducer_createpost';
import { reducer as formReducer } from 'redux-form';
import{ routerReducer } from 'react-router-redux';
const rootReducer = combineReducers({
    routing : routerReducer,
    fetchposts : FetchPostReducer,
    createposts : CreatePostReudcer,
    form : formReducer
  })
  ;

export default rootReducer;
