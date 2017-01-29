import jwt from 'jsonwebtoken';
import CustomError from '../CustomError';
import { User } from '../model';
import config from '../config';
let auth = async(req, res, next) => {
  let { method, path, headers }=req;
  if (!headers.authorization) {
    req.userIsAuthenticated = false;
    next();
  } else {
    try {
      const headString = headers.authorization;
      const headerArray = headString.split(' ');
      if (headerArray.length != 2) {
        throw new CustomError('Token Format is like Bearer \<token\>', 401);
      }
      const [type, token]=headerArray;
      if (type != 'Bearer') {
        throw new CustomError('Token Format is like Bearer \<token\>', 401);
      }
      const decoded = jwt.verify(token, config.secret);
      const { username }=decoded;
      req.userIsAuthenticated = true;
      req.user = await User.findOne({ username });
      req.tokenError = undefined;
      next();
    } catch (err) {
      req.userIsAuthenticated = false;
      req.tokenError = err.message;
      next();
    }
  }

};
export default auth;
