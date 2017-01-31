import express from 'express';
import mongoose from 'mongoose';
import { Post, Comment }from '../model';
import config from '../config';
let router = express.Router({ mergeParams: true });
import CustomError from '../CustomError';
mongoose.Promise = global.Promise;
let {numPerPage} =config;
router.route('/').get(
  async(req, res, next) => {
    try {
      let {title,page}=req.query;
      let query = {};
      if (title ) {
//        query['title'] = new RegExp(req.query.title);
        query.$text={$search:title};
      }
      console.log(query);
      if(!page) page=1;
      let [posts,counts] = await Promise.all([
        Post.find(query).skip(numPerPage*(page-1)).limit(numPerPage),
        Post.find(query).count()
      ]);
      let totalpage=Math.ceil(counts/numPerPage);
      posts=posts.map((data) => data.toJSON());
      let result={
        totalpage,
        items:posts
      };
      res.json(result);
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
      let post = await Post.findById(id).populate('comments');
      res.json(post.toJSON());
    } catch (err) {
      next(err);
    }
  }
).put(
  async(req, res, next) => {
    try {
      const { id } =req.params;
      let post = await Post.findByIdAndUpdate(id, req.body);
      res.json(post.toJSON());
    } catch (err) {
      next(err);
    }
  }
).delete(
  async(req, res, next) => {
    try {
      const { id } = req.params;
      let post = await Post.findByIdAndRemove(id);
      res.status(204).json({});
    } catch (err) {
      next(err);
    }

  }
);
router.route('/:id/comments').post(
  async(req, res, next) => {
    try {
      const { id }=req.params;
      let [post, comment] =await Promise.all(
        [Post.findById(id), Comment.create(req.body)]
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
router.route('/:postid/comments/:commentid')
  .delete(
    async(req, res, next) => {
      try {
        const { postid, commentid }=req.params;
        let [post, comment] =await Promise.all(
          [
            Post.findByIdAndUpdate(postid, { $pull: { comments: commentid } }),
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
