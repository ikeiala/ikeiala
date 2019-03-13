const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userDaySchema = new Schema({
  title: String,
  movies: [{type:Schema.Types.ObjectId, ref:"Movie"}],
  series: [{type:Schema.Types.ObjectId, ref:"Serie"}],
  games: [{type:Schema.Types.ObjectId, ref:"Game"}],
}, {
  timestamps: true
});

const UserDay = mongoose.model('UserDay', userDaySchema);
module.exports = UserDay;
