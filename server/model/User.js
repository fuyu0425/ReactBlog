import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false }
  }, {
    versionKey: false,
    toJson: {
      getters: true,
      virtuals: true
    }
  }
);
UserSchema.set('toJSON', { getters: true, virtuals: true });
let User = mongoose.model('User', UserSchema);
export default User;
