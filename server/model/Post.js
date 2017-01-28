import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let PostSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    summary: { type: String },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }]
  }
);

PostSchema.pre('save', function (next) {
  let length = Math.min(this.content.length, 50);
  this.summary = this.summary || this.content.substring(0, length);
  next();
});
if (!PostSchema.options.toJSON) PostSchema.options.toJSON = {};
PostSchema.options.toJSON.transform = function (doc, ret, options) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};
let Post = mongoose.model('Post', PostSchema);
export  default Post;
