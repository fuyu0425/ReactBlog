import axios from 'axios';
import qs from 'qs';
import config from '../../config';

const url = `${config.apiServer}/api/posts`;
const Posts = {
  getPostList: data => axios.get(`${url}/?${qs.stringify(data)}`),
  getPostDetail: id => axios.get(`${url}/${id}`),
  createPost: (data, token) => axios.post(url, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }),
};


export default Posts;
