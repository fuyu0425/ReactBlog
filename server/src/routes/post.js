import express from 'express';
import mongoose from 'mongoose';
import { Post, Comment }from '../model';
import config from '../config';
let router = express.Router({ mergeParams: true });
import CustomError from '../CustomError';
mongoose.Promise = global.Promise;
let { defaultNumPerPage } = config;
router.route('/').get(
  async (req, res, next) => {
    try {
      let { title, page, per } = req.query;
      let query = {};
      if (title) {
        query.$text = { $search: title };
      }
      let numPerPage = Number(per) || defaultNumPerPage;
      console.log(query);
      if (!page) page = 1;
      let [posts, counts] = await Promise.all([
        Post.find(query).skip(numPerPage * (page - 1)).limit(numPerPage),
        Post.find(query).count()
      ]);
      let totalpage = Math.ceil(counts / numPerPage);
      posts = posts.map((data) => data.toJSON());
      let result = {
        totalpage,
        items: posts
      };
      res.json(result);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
).post(
  async (req, res, next) => {

    try {
      if (!req.isAuthenticated) throw new CustomError('need authorization', 401);
      console.log(req.body);
      let post = await Post.create(req.body);
      res.json(post.toJSON());
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);
router.route('/:slug').get(
  async (req, res, next) => {
    try {
      const { slug } = req.params;
      let post = await Post.findOne({ slug }).populate('comments');
      res.json(post.toJSON());
    } catch (err) {
      next(err);
    }
  }
).put(
  async (req, res, next) => {
    try {
      if (!req.isAuthenticated) throw new CustomError('need authorization', 401);
      const { slug } = req.params;
      let post = await Post.findOneAndUpdate({ slug }, req.body);
      res.json(post.toJSON());
    } catch (err) {
      next(err);
    }
  }
).delete(
  async (req, res, next) => {
    try {
      if (!req.isAuthenticated) throw new CustomError('need authorization', 401);
      const { slug } = req.params;
      let post = await Post.findOneAndRemove({ slug });
      res.status(204).json({});
    } catch (err) {
      next(err);
    }

  }
);
router.route('/:slug/comments').post(
  async (req, res, next) => {
    try {
      console.log(req.isAuthenticated);
      const { slug } = req.params;
      let [post, comment] = await Promise.all(
        [Post.findOne({ slug }), Comment.create(req.body)]
      );
      console.log(post, comment);
      post.comments.push(comment);
      post = await post.save();
      res.json(post.toJSON());
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);
router.route('/:slug/comments/:commentid')
  .delete(
    async (req, res, next) => {
      try {
        if (!req.isAuthenticated) throw new CustomError('need authorization', 401);
        const { slug, commentid } = req.params;
        let [post, comment] = await Promise.all(
          [
            Post.findOneAndUpdate({ slug }, { $pull: { comments: commentid } }),
            Comment.findByIdAndRemove(commentid)
          ]);
        res.status(204).json({});
      } catch (err) {
        console.log(err);
        next(err);
      }
    }
  );
export default router;
