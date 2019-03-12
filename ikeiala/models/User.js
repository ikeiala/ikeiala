const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  profile_pic: String,
  bio: String,
  movies: [{type:Schema.Types.ObjectId, ref:"Movie"}],
  series: [{type:Schema.Types.ObjectId, ref:"Serie"}],
  games: [{type:Schema.Types.ObjectId, ref:"Game"}],
  wikis: {type:Schema.Types.ObjectId, ref: "Wiki"},
  tuits: [{type:Schema.Types.ObjectId, ref:"Tuit"}],
  comments: [{type:Schema.Types.ObjectId, ref:"Comment"}],
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
