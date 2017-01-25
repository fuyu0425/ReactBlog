import mongoose from 'mongoose';
import { User } from '../model';
import config from '../config';
mongoose.connect(config.db);
mongoose.Promise = global.Promise;
User.create(
  {
    username : config.adminUsername,
    password : config.adminPassword,
    admin : true
  }
).then(() => {
  console.log('success');
  process.exit(0);
})
  .catch((err) => {
    console.log(err);
    process.exit(1);

  });

