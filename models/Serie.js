const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const serieSchema = new Schema({
  name: String,
  overview: String,
  poster_path: String,
}, {
  timestamps: true
});

const Serie = mongoose.model('Serie', serieSchema);
module.exports = Serie;