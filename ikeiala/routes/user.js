const express = require('express')
const router  = express.Router()
const axios = require('axios')
const rp = require('request-promise')
const cheerio = require('cheerio')
const Day = require(`../models/Day`)
const Movie = require(`../models/Movie`)
const Serie = require(`../models/Serie`)
const Tuit = require(`../models/Tuit`)
const Wiki = require(`../models/Wiki`)
const Game = require(`../models/Game`)
const User = require(`../models/User`)


router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => res.render('user',{user}))
    .catch(err => console.log(`Error finding user: ${err}`))
  ;
});

router.post('/new/:id/:type', (req, res, next) => {

  User.findByIdAndUpdate({_id:req.session.currentUser._id},{ $push: { "req.params.type": req.params.id }},{new:true})
    .then(user => {
      console.log("user updated its event list")
      res.render('user',{user})
    })
    .catch(err => console.log(`Error finding user: ${err}`))
  ;
});
