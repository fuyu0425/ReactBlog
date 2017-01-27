import express from 'express';
import mongoose from 'mongoose';
var Post = mongoose.model('Post');
var router = express.Router({ mergeParams: true });
import CustomError from '../CustomError';
mongoose.Promise = global.Promise;

router.route('/').get(
  async(req, res, next) => {
    try {
      let query = {};
      if (req.query.title) {
        query['title'] = new RegExp(req.query.title);
      }
      let posts = await Post.find(query);
      res.json(posts.map((data) => data.toJSON()));
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
).post(
  async(req, res, next) => {
    try {
      console.log(req.body);
      let post = await Post.create(req.body);
      res.json(post.toJSON());
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);
router.route('/:id').get(
  async(req, res, next) => {
    try {
      const { id } =req.params;
      let post = await Post.findById(id);
      res.json(post.toJSON());
    } catch (err) {
      next(err);
    }
  }
).put(
  async(req, res, next) => {
    try {
      const { id } =req.params;
      let post = await Post.findOneAndUpdate({ id }, req.body);
      res.json(post.toJSON());
    } catch (err) {
      next(err);
    }
  }
);

export default router;
