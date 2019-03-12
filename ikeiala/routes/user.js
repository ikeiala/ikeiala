const express = require('express')
const router  = express.Router()


const User = require(`../models/User`)


router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
  .populate(`movies`).populate(`series`).populate(`games`).populate(`comments`)
    .then(user => {
      console.log(user)
      res.render('user',{user})
    })
    .catch(err => console.log(`Error finding user: ${err}`))
  ;
});

router.get('/new/:id/:type', (req, res, next) => {

  User.findByIdAndUpdate({_id:req.user._id},{ $push: { [req.params.type]: req.params.id }},{new:true})
  .populate(`movies`).populate(`series`).populate(`games`).populate(`comments`)
    .then(user => {
      console.log("user updated its event list")
      res.render('user',{user})
    })
    .catch(err => console.log(`Error finding user: ${err}`))
  ;
});

module.exports = router;
