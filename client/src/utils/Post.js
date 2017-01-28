import axios from 'axios';
import qs from 'qs';
import config from '../../config';

const url = `${config.apiServer}/api/posts`;

const token = window.localStorage.getItem('token');
const headers = {
  authorization: `Bearer ${token}`,
};
const Posts = {
  getPostList: data => axios.get(`${url}/?${qs.stringify(data)}`),
  getPostDetail: id => axios.get(`${url}/${id}`),
  createPost: data => axios.post(url, data, { headers }),
  updatePost: (id, data) => axios.put(`${url}/${id}`, data, { headers }),
};


export default Posts;
