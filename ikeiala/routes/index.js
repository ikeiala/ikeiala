const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


/* POST COMMENT */
router.post('/comment/new/:id', (req, res, next) => {
  let newcomment = {
    text: req.body.text,
    author: req.session.currentUser._id,
    day: req.params.id
  }
  Comment.create(newcomment)
    .then(commentcreated => {
      User.findByIdAndUpdate({_id:req.session.currentUser._id},{ $push: { comments: commentcreated._id }},{new:true})
      .then(user => {
        console.log("user updated its comments list")
      })
      .catch(err => console.log(`Error finding user: ${err}`))

      Day.findByIdAndUpdate({_id:req.params.id},{ $push: { comments: commentcreated._id }},{new:true})
      .then(day => {
        console.log("user updated day comment list")
      })
      .catch(err => console.log(`Error finding user: ${err}`))
    })


});

module.exports = router;
