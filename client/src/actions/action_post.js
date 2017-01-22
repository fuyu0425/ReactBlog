import axios from 'axios';
import config from '../../config';
export const FETCH_POST = 'FETCH_POST';
const API_HOST = (process.env.NODE_ENV == 'development') ? '' : config.apiServer;
export default function fecthPost() {
  const url = `${API_HOST}/posts/`;
  const request = axios.get(url);
  return {
    type : FETCH_POST,
    payload : request
  }

}
