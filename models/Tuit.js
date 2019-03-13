const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const tuitSchema = new Schema({
  title: String,
  link: String,
}, {
  timestamps: true
});

const Tuit = mongoose.model('Tuit', tuitSchema);
module.exports = Tuit;
