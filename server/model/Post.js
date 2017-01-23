import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let PostSchema = new Schema(
  {
    title : { type : String, required : true },
    content : { type : String, required : true },
    summary : { type : String },
    comments : [ {
      type : Schema.Types.ObjectId,
      ref : 'comment'
    } ]
  }, {
    versionKey : false,
  }
);

PostSchema.pre('save', function (next) {
  let length = Math.min(this.content.length, 50);
  this.summary = this.summary || this.content.substring(0, length);
  next();
});


let Post = mongoose.model('Post', PostSchema);
export  default Post;
