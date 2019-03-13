const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  profile_pic: String,
  bio: String,
  days: [{type:Schema.Types.ObjectId, ref:"UserDay"}],
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
