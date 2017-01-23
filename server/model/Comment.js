import mongoose from 'mongoose';
const { Schema }=mongoose;

const CommentSchema = new Schema({
  content : { type : String, required : true },
  author : { type : String, required : true }
});

const Comment = mongoose.model('comment', CommentSchema);
export default Comment;
