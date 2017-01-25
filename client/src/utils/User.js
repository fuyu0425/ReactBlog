import axios from 'axios';
import qs from 'qs';
import config from '../../config';
const url = `${config.apiServer}/api/users`;
const Users = {
  getUser : (data) => axios.get(`${url}/?${qs.stringify(data)}`),
  createUser : (data) => axios.post(url, data),
  login : (data) => axios.post(`${url}/login`, data),
  logout : () => localStorage.removeItem('token'),
  verifyToken : (data) => axios.post(`${config.apiServer}/api/verify-token`, data),
};


export default Users;
