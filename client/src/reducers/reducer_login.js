import {
    LOGIN_SUCCESS,
    LOGIN_ERROR
} from '../actions/action_login';

export default function (state = {
    token : '',
    success : true,
    logged : false
}, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token : action.payload,
                success : true,
                logged : true
            };
        case LOGIN_ERROR:
            return {
                ...state,
                error : action.payload,
                success : false,
                logged : false
            };
    }
    return state;
}
