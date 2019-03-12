const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const daySchema = new Schema({
  title: String,
  description: {
    type: String,
  },
  movies: [{type:Schema.Types.ObjectId, ref:"Movie"}],
  series: [{type:Schema.Types.ObjectId, ref:"Serie"}],
  games: [{type:Schema.Types.ObjectId, ref:"Game"}],
  wikis: {type:Schema.Types.ObjectId, ref: "Wiki"},
  tuits: [{type:Schema.Types.ObjectId, ref:"Tuit"}],
  comments: [{type:Schema.Types.ObjectId, ref:"Comment"}],
}, {
  timestamps: true
});

const Day = mongoose.model('Day', daySchema);
module.exports = Day;
