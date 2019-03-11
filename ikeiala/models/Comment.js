const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  text: String,
  author: Schema.Types.ObjectId,
  day: Schema.Types.ObjectId,
  }, {
  timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
