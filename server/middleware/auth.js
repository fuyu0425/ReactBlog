import jwt from 'jsonwebtoken';
import CustomError from '../CustomError';
import { User } from '../model';
let loginPath = '/users/login';
let registerPath = '/users';
let verifyPath = '/verify-token';
const ok = [ loginPath, registerPath, verifyPath ];
let auth = async(req, res, next) => {
  let { method, path, headers }=req;
  let len = path.length;
  if (path[ len - 1 ] == '/') path = path.slice(0, len - 1);
  console.log(path);
  if (method != 'GET') {
    if (method == 'POST' && (path in ok)) {
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
          const decoded = jwt.verify(token, config.secret);
          const { username }=decoded;
          req.user = await User.findOne({ username });
          next();
        } catch (err) {
          next(err);
        }
      }
    }
  } else {
    next();
  }
};
export default auth;
