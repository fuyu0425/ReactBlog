import axios from 'axios';
import qs from 'qs';
import config from '../../config';
const url = `${config.apiServer}/api/posts`;
const Posts = {
    getPost : (data) => axios.get(`${url}/?${qs.stringify(data)}`),
    createPost : (data) => axios.post(url, data),
};


export default Posts;