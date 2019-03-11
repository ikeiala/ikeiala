const express = require('express')
const router  = express.Router()
const axios = require('axios')


let movies = undefined
let series = undefined
let tomorrow = undefined
let yesterday = undefined


router.post('/', (req, res, next) => {

  const userDay = req.body.date
  const year = parseInt(userDay.slice(0,4))
  const month = parseInt(userDay.slice(5,7)) - 1
  const day = parseInt(userDay.slice(8,10))


  const date = new Date(year, month, day, 12, 0, 0)
  const dateBefore = new Date(date - 86400000)
  const dateAfter = new Date()
  dateAfter.setTime(date.getTime() + 86400000)

  let monthBeforeNormalized = ""
  let monthAfterNormalized = ""

  if (parseInt(dateBefore.getMonth() + 1) < 10){
    monthBeforeNormalized = "0" + (parseInt(dateBefore.getMonth()) + 1)
  } else {
    monthBeforeNormalized = dateBefore.getMonth() + 1
  }

  if (parseInt(dateAfter.getMonth() + 1) < 10){
    monthAfterNormalized = "0" + (parseInt(dateAfter.getMonth()) + 1)
  } else {
    monthAfterNormalized = dateAfter.getMonth() + 1
  }

  let dayBeforeNormalized = ""
  let dayAfterNormalized = ""

  if (parseInt(dateBefore.getDate()) < 10){
    dayBeforeNormalized = "0" + (parseInt(dateBefore.getDate()))
  } else {
    dayBeforeNormalized = dateBefore.getDate()
  }

  if (parseInt(dateAfter.getDate()) < 10){
    dayAfterNormalized = "0" + (parseInt(dateAfter.getDate()))
  } else {
    dayAfterNormalized = dateAfter.getDate()
  }

  yesterday = `${dateBefore.getFullYear()}-${monthBeforeNormalized}-${dayBeforeNormalized}`
  tomorrow = `${dateAfter.getFullYear()}-${monthAfterNormalized}-${dayAfterNormalized}`

  let r1 = axios.get(`  https://api.themoviedb.org/3/discover/movie?api_key=3aa350912efdcc79b7c8fddde2759632&language=es-ES&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&release_date.gte=${yesterday}&release_date.lte=${tomorrow}`)
    .then (response => {
      movies = response.data.results
      return movies
    })
    .catch (err => {
      console.log(err)
    })

  let r2 = axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=3aa350912efdcc79b7c8fddde2759632&language=es-ES&sort_by=popularity.desc&air_date.gte=${yesterday}&air_date.lte=${tomorrow}&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`)
    .then (answer => {
        series = answer.data.results
        return series
    })
    .catch (err => {
        console.log(err)
    })   

  Promise.all([r1,r2])
    .then (() => {
      console.log(r1)
      console.log(r2)
      res.render('day', {movies, series});
    })
    .catch (err => {
      console.log(err)
    })
});

module.exports = router;
