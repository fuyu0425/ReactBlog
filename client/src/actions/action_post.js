import { createAction } from 'redux-actions';
import Post from '../utils/Post';

export const getPostList = createAction('GET_POST_LIST', Post.getPostList);
export const getPostDetail = createAction('GET_POST_DETAIL', Post.getPostDetail);
export const createPost = createAction('CREATE_POST', Post.createPost);
