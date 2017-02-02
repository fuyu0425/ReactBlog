import { User, Post } from './model';
import mongoose from 'mongoose';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import user from './routes/user';
import post from './routes/post';
import CustomError from './CustomError';
import status from 'http-status-codes';
import config from './config';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import bluebird from 'bluebird';
import auth from './middleware/auth';
import verify_token from './utils/verfiy_token';
global.Promise = bluebird;

const {dbUser,dbPwd,dbHost,dbPort,dbAuthSource,dbDatabase} = config;

mongoose.connect(`mongodb://${dbUser}:${dbPwd}@${dbHost}:${dbPort}/${dbDatabase}?authSource=${dbAuthSource}`);


const app = express();


app.use(cors());
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});
app.use(auth);
let router = express.Router();
router.post('/verify-token', verify_token);
router.use('/users', user);
router.use('/posts', post);
app.use('/api', router);


app.use((err, req, res, next) => {
  if(err) {
    if (err instanceof CustomError) {
      if (err.status == 401 && req.tokenError) {
        res.json({ error: req.tokenError })
      }
      res.status(err.status);
      delete err.status;
    } else {
      res.status(400);
    }
    res.json({ error: err });
  }else res.status(404).json({error:'not found'})
});




module.exports = app;
