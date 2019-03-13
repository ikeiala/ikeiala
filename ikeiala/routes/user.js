const express = require('express')
const router  = express.Router()


const User = require(`../models/User`)
const Comment = require(`../models/Comment`)
const Day = require(`../models/Day`)
const UserDay = require(`../models/UserDay`)


function ensureAuthenticatedAndOwner(req, res, next) {
  if (req.isAuthenticated() && req.user.id === req.params.id) {
    return next();
  } else {
    res.redirect('/')
  }
}

router.get('/:id', ensureAuthenticatedAndOwner, (req, res, next) => {
  User.findById(req.params.id)
  .populate({path: "days", populate: {path: "movies"}})
  .populate({path: "days", populate: {path: "series"}})
  .populate({path: "days", populate: {path: "games"}})
  .populate({path : "comments", populate: {path : "day"}})

    .then(user => {
        user.days = user.days.map(day => {
          day.title = day.title.substring(8,10) + "/" + day.title.substring(5,7) + "/" + day.title.substring(0,4)
          return day
        })
      res.render('user', {user})
    })
    .catch(err => console.log(`Error finding user: ${err}`))
  ;
});

router.get('/new/:dayTitle/:itemId/:type', (req, res, next) => {
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
        res.json({x:"hola"})
      })
      .catch(err => {
        console.log("Ha habido un error" + err)
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
