const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  profile_pic: String,
  bio: String,
  events: [Schema.Types.ObjectId],
  comments: [Schema.Types.ObjectId]
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
