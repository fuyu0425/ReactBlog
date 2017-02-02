import mongoose from 'mongoose';
const { Schema }=mongoose;

const CommentSchema = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true }
});
if (!CommentSchema.options.toJSON) CommentSchema.options.toJSON = {};
CommentSchema.options.toJSON.transform = function (doc, ret, options) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};
const Comment = mongoose.model('comment', CommentSchema);
export default Comment;
