import mongoose from 'mongoose';
import config from '../config';
mongoose.Promise = global.Promise;
console.log(config.db);
mongoose.connect(config.db, () => {
    console.log(mongoose.connection);
    const { users, posts }=mongoose.connection.collections;
    users.drop(() => {
        posts.drop(() => {

          }
        )
      }
    )
  }
);

