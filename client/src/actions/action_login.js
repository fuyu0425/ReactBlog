import axios from 'axios';
import config from '../../config';
export const LOGIN_REQUEST = 'LOGIN＿REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
import { push } from 'react-router-redux';
const API_HOST = config.apiServer;

function loginSuccess(result) {
    return {
        type : LOGIN_SUCCESS,
        payload : result.data
    }
}
function loginError(error) {
    return {
        type : LOGIN_ERROR,
        payload : error.message
    }
}

export default function login(data) {
    const url = `${API_HOST}/api/users/login/`;
    return dispatch => {
        axios.post(url, data)
            .then(result => {
                dispatch(loginSuccess(result));
                dispatch(push('/'));
            })
            .catch(error => dispatch(loginError(error)));
    };

}
