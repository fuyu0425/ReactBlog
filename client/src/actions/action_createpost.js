import axios from 'axios';
import config from '../../config';
export const CREATE_POST_REQUEST = 'CREATE_POST＿REQUEST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_ERROR = 'CREATE_POST_ERROR';
import { push } from 'react-router-redux';
const API_HOST = config.apiServer;

function createPostSucess(result) {
    return {
        type : CREATE_POST_SUCCESS,
        payload : result.data
    }
}
function createPostError(error) {
    return {
        type : CREATE_POST_ERROR,
        payload : error.message
    }
}

export default function createPost(data) {
    const url = `${API_HOST}/api/posts/`;
    return dispatch => {
        axios.post(url, data)
            .then(result => {
                dispatch(createPostSucess(result));
                dispatch(push('/'));
            })
            .catch(error => dispatch(createPostError(error)));
    };

}
