import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
let { secret } = config;
let router = express.Router({ mergeParams: true });
import CustomError from '../CustomError';

//login using username and password
router.post('/login', async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (username !== config.adminUsername) {
      throw new CustomError('user doesn\'t exist', 401);
    }
    if (password !== config.adminPassword) {
      throw new CustomError('password is wrong', 401);
    }
    const payload = {
      username
    };
    const options = {
      expiresIn: '1d'
    };
    const token = jwt.sign(payload, secret, options);
    console.log(token);
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
});
export default router;
