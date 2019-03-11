const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventSchema = new Schema({
  title: String,
  description: String,
  event_pic: String,
  type: {
    type: String,
    enum: ["Movie", "Series", "Game"]
  },
  date: Date,
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
