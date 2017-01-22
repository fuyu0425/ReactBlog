import { User, Post } from './model';
import mongoose from 'mongoose';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import user from './routes/user';
import post from './routes/post';
import CustomError from './routes/CustomError';
import status from 'http-status-codes';
import config from './config';
import jwt from 'jsonwebtoken';
import cors from 'cors';


mongoose.connect(config.db);


const app = express();

let loginPath = '/users/login';
let registerPath = '/users';
app.use(cors());
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

app.use((req, res, next) => {
  const { path, method, headers, url }= req;
  res.setHeader('Content-Type', 'application/json');
  next();
});
app.use(async(req, res, next) => {
  let { method, path, headers }=req;
  let len = path.length;
  if (path[ len - 1 ] == '/') path = path.slice(0, len - 1);
  console.log(path);
  if (method != 'GET') {
    if (method == 'POST' && ( path == loginPath || path == registerPath)) {
      console.log('hi');
      next();
    }
  }
  else {
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
        const USER = await User.findOne({ username });
        req.user = USER;
        next();
      } catch (err) {
        next(err);
      }
    }
  }
});
app.use('/users', user);
app.use('/posts', post);


app.use((err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.status);
    delete err.status;
  } else {
    res.status(400);
  }
  res.json({ error : err });
});


// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// error handler
// app.use(function(err, req, res, next) {
//   set locals, only providing error in development
// res.locals.message = err.message;
// res.locals.error = req.app.get('env') === 'development' ? err : {};
//
// render the error page
// res.status(err.status || 500);
// res.render('error');
// });

module.exports = app;
