import jwt from 'jsonwebtoken';
import CustomError from '../CustomError';
import { User } from '../model';
import config from '../config';
let loginPath = '/api/users/login';
let registerPath = '/api/users';
let verifyPath = '/api/verify-token';
const ok = [ loginPath, registerPath, verifyPath ];
let auth = async(req, res, next) => {
  let { method, path, headers }=req;
  let len = path.length;
  if (path[ len - 1 ] == '/') path = path.slice(0, len - 1);
  console.log(path);
  if (method != 'GET') {
    if (method == 'POST' && ok.includes(path)) {
      console.log('hi');
      next();
    } else {
      if (!headers.authorization) {
        const err = {
          error : 'Need Authorization JWT'
        };
        next(new CustomError('Need Authorization JWT', 401));
      } else {
        try {
          const headString = headers.authorization;
          const headerArray = headString.split(' ');
          if (headerArray.length != 2) {
            throw new CustomError('Token Format is like Bearer \<token\>', 401);
          }
          const [ type, token ]=headerArray;
          if (type != 'Bearer') {
            throw new CustomError('Token Format is like Bearer \<token\>', 401);
          }
          console.log('jwt');
          const decoded = jwt.verify(token, config.secret);
          console.log('hi');
          console.log(decoded);
          const { username }=decoded;
          req.user = await User.findOne({ username });
          next();
        } catch (err) {
          next(new CustomError('invalid token', 401));
        }
      }
    }
  } else {
    next();
  }
};
export default auth;
