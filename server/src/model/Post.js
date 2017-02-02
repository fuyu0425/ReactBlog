import mongoose from 'mongoose';
import moment from 'moment';
let Schema = mongoose.Schema;
let PostSchema = new Schema(
  {
    title: { type: String, required: true ,index:true },
    content: { type: String, required: true },
    summary: { type: String },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: 'comment'
    }],
    updated: { type: Date, default: Date.now() }

  }
);
PostSchema.index({title:'text'});
PostSchema.pre('save', function (next) {
  let length = Math.min(this.content.length, 50);
  this.summary = this.summary || this.content.substring(0, length);
  this.updated = Date.now();
  next();
});
if (!PostSchema.options.toJSON) PostSchema.options.toJSON = {};
PostSchema.options.toJSON.transform = function (doc, ret, options) {
  ret.id = ret._id;
  let date = moment(ret.updated);
  ret.updated = date.format('YYYY-MM-DD');
  delete ret._id;
  delete ret.__v;
  return ret;
};
let Post = mongoose.model('Post', PostSchema);
export  default Post;
