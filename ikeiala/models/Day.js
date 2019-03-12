const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const daySchema = new Schema({
  title: String,
  description: {
    type: String,
  },
  events: [Schema.Types.ObjectId],
  comments: [Schema.Types.ObjectId],
}, {
  timestamps: true
});

const Day = mongoose.model('Day', daySchema);
module.exports = Day;
