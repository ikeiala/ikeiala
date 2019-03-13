const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  overview: String,
  poster_path: String,
}, {
  timestamps: true
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;