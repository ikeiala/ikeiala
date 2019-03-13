const express = require('express');
const router  = express.Router()

const Day = require(`../models/Day`)
const User = require(`../models/User`)
const Comment = require(`../models/Comment`)


/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index',{user:req.user});
});


/* POST COMMENT */
router.post('/comment/new/:id', (req, res, next) => {
  let newcomment = {
    text: req.body.text,
    author: req.user._id,
    day: req.params.id
  }
  Comment.create(newcomment)
    .then(commentcreated => {
      User.findByIdAndUpdate({_id:req.user._id},{ $push: { comments: commentcreated._id }},{new:true})
      .then(user => {
        console.log("user updated its comments list")
        res.json({text:commentcreated.text,author:req.user.username})
      })
      .catch(err => console.log(`Error finding user: ${err}`))

      Day.findByIdAndUpdate({_id:req.params.id},{ $push: { comments: commentcreated._id }},{new:true})
      .then(day => {
        console.log("user updated day comment list")
      })
      .catch(err => console.log(`Error finding user: ${err}`))
      //res.json({msg:"ok"})
    })


});

module.exports = router;
