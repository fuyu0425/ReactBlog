import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    username : { type : String, required : true, unique : true },
    password : { type : String, required : true },
    admin : { type : Boolean, default : false }
  }, {
    versionKey : false,
  }
);
let User = mongoose.model('User', UserSchema);
export default User;
