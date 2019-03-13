const express = require('express')
const router  = express.Router()


const User = require(`../models/User`)
const Comment = require(`../models/Comment`)
const Day = require(`../models/Day`)
const UserDay = require(`../models/UserDay`)





router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
  .populate(`movies`).populate(`series`).populate(`games`)
  .populate({path : "comments", populate: {path : "day"}})

    .then(user => {
      console.log(user)
      res.render('user',{user})
    })
    .catch(err => console.log(`Error finding user: ${err}`))
  ;
});

router.get('/new/:dayTitle/:itemId/:type', (req, res, next) => {
  console.log(req.params)
  User.findById(req.user.id)
  .populate("days")
  .then (user => {
    let foundUserDayId = undefined

    user.days.forEach (elm => {
      if (elm.title === req.params.dayTitle){
        foundUserDayId = elm._id
      }
    })

    if (foundUserDayId){
      UserDay.findByIdAndUpdate(foundUserDayId,{ $addToSet: { [req.params.type]: req.params.itemId }},{new:true})
      .then(userDay => {
        console.log("Holiiiii")
        console.log(userDay)
        res.json({x:"hola"})
      })
      .catch(err => {
        console.log("Uhhhhhh" + err)
      })
    } else {
      let newUserDay = {
        title: req.params.dayTitle,
        movies: [],
        series: [],
        games: [],
      }

      switch (req.params.type) {
        case "movies":
        newUserDay.movies = req.params.itemId
        break
        case "series":
        newUserDay.series = req.params.itemId
        break
        case "games":
        newUserDay.games = req.params.itemId
        break
      }

      UserDay.create(newUserDay)
                .then(newUserDay => {
                  console.log("newUserDay created")
                  User.findByIdAndUpdate({_id:req.user._id},{ $push: { days: newUserDay}},{new:true})
                  .then(user => {
                    console.log("userday added to user array")
                    res.redirect(`/user/${req.user._id}`)
                  })
                  .catch(err => {
                    console.log("something bad happened adding userday to user array" + err)
                  })
      })
    }
  })
})

module.exports = router;
