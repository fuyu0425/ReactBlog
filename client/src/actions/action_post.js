import { createAction } from 'redux-actions';
import Post from '../utils/Post';

export const getPost = createAction('GET_POST', Post.getPost);
export const createPost = createAction('CREATE_POST', Post.createPost);