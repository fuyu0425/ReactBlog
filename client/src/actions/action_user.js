import { createAction } from 'redux-actions';
import User from '../utils/User';

export const getUser = createAction('GET_USER', User.getUser);
export const createUser = createAction('CREATE_USER', User.createUser);
export const login = createAction('LOGIN', User.login);
