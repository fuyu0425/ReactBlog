import axios from 'axios';
import qs from 'qs';
import config from '../../config';
const url = `${config.apiServer}/api/posts`;
const Posts = {
  getPost : (data) => axios.get(`${url}/?${qs.stringify(data)}`),
  createPost : (data, token) => axios.post(url, data, {
    headers : {
      'authorization' : `Bearer ${token}`
    }
  }),
};


export default Posts;
