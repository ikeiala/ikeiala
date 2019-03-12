const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const daySchema = new Schema({
  title: String,
  description: {
    type: String,
  },
  movies: [{type:Schema.Types.ObjectId, ref:"Movie"}],
  series: [Schema.Types.ObjectId],
  games: [Schema.Types.ObjectId],
  wikis: [Schema.Types.ObjectId],
  tuits: [Schema.Types.ObjectId],
  comments: [Schema.Types.ObjectId],
}, {
  timestamps: true
});

const Day = mongoose.model('Day', daySchema);
module.exports = Day;
