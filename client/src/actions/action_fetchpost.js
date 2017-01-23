import axios from 'axios';
import config from '../../config';
export const FETCH_POST_REQUEST = 'FETCH_POST＿REQUEST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_ERROR = 'FETCH_POST_ERROR';
const API_HOST =  config.apiServer;

function fetchPostSucess(result) {
  return {
    type : FETCH_POST_SUCCESS,
    payload : result.data
  }
}
function fetchPostError(error) {
  return {
    type : FETCH_POST_ERROR,
    payload : error.message
  }
}

export default function fecthPost() {
  const url = `${API_HOST}/api/posts/`;
  return dispatch => {
    axios.get(url)
      .then(result => dispatch(fetchPostSucess(result)))
      .catch(error => dispatch(fetchPostError(error)));
  };

}
