import { combineReducers } from 'redux';
import FetchPostReducer from './reducer_fetchpost';
import CreatePostReudcer from './reducer_createpost';
import LoginReducer from './reducer_login';
import { reducer as formReducer } from 'redux-form';
import{ routerReducer } from 'react-router-redux';
const rootReducer = combineReducers({
        routing : routerReducer,
        login : LoginReducer,
        fetchposts : FetchPostReducer,
        createposts : CreatePostReudcer,
        form : formReducer
    })
    ;

export default rootReducer;
