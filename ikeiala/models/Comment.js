const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const commentSchema = new Schema({
  text: String,
  author: {type:Schema.Types.ObjectId, ref:"User"},
  day: [{type:Schema.Types.ObjectId, ref:"Day"}],
  }, {
  timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
