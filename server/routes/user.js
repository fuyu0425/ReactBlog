import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from '../config';
let { secret } =config;
let User = mongoose.model('User');
let router = express.Router({ mergeParams : true });
import CustomError from './CustomError';
mongoose.Promise = global.Promise;


//users
router.route('/')
  .get(async(req, res, next) => {
    try {
      const users = await User.find({}).select('username -_id');
      res.json(users);
    } catch (err) {
      next(err);
    }
  })
  .post(async(req, res, next) => {
    // const {username,password}=req.body;
    try {
      const data = await User.create(req.body);
      res.json(data);
    } catch (err) {
      next(err);
    }
  });
//find user by username
router.route('/:username')
  .get(async(req, res, next) => {
    console.log(req.user);
    const params = req.params;
    try {
      const user = await User.findOne({ username : params.username });
      if (!user) {
        throw new CustomError("the user doesn't exist", 404);
      }
      res.json(user);
    } catch (err) {
      next(err);
    }

  });

//login using username and password
router.post('/login', async(req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const user = await User.findOne({ username : username });
    if (!user) {
      throw new CustomError("user doesn't exist", 401);
    }
    if (password != user.password) {
      throw new CustomError('password is wrong', 401);
    }
    const payload = {
      username
    };
    const options = {
      expiresIn : '1d'
    };
    const token = jwt.sign(payload, secret, options);
    console.log(token);
    res.status(200).json({ token })
  } catch (err) {
    next(err);
  }
});
export default router;
