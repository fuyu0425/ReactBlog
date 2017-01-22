import mongoose from 'mongoose';
let Schema = mongoose.Schema;
let PostSchema = new Schema(
  {
    title : { type : String, required : true },
    begin : { type : Date, required : true },
    end : {
      type : Date,
      required : true,
      validate : [ dataValidator, 'End Must More Than Start' ]
    },
    place : { type : String, required : true },
    description : { type : String, required : true },
    items : [
      {
        title : { type : String, required : true },
        author : { type : String, required : true },
        url : { type : String, required : true }
      }
    ]
  }, {
    versionKey : false,
  }
);

function dataValidator(value) {
  return this.begin <= value;
}


let Post = mongoose.model('Post', PostSchema);
export  default Post;
