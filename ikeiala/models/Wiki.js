const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const wikiSchema = new Schema({
  img: String,
  wikis: [
    {year: String,
    description: String,
    link: String}
  ],
}, {
  timestamps: true
});

const Wiki = mongoose.model('Wiki', wikiSchema)
module.exports = Wiki
