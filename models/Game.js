const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const gameSchema = new Schema({
  name: String,
  summary: String,
  platforms: [Number],
  url: String
}, {
  timestamps: true
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;