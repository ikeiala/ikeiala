const express = require('express')
const router  = express.Router()
const axios = require('axios')
const rp = require('request-promise')
const cheerio = require('cheerio')
// const igdb = require('igdb-api-node').default;

// const client = igdb('e946f475539429b55eab2775f5d14022');


let movies = undefined
let series = undefined
let wiki = undefined
let tomorrow = undefined
let yesterday = undefined
let titles = []
let links = []
let tuits = []
let meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

router.post('/', (req, res, next) => {

  const userDay = req.body.date
  const year = parseInt(userDay.slice(0,4))
  const month = parseInt(userDay.slice(5,7)) - 1
  const day = parseInt(userDay.slice(8,10))

  const date = new Date(year, month, day, 12, 0, 0)
  const dateBefore = new Date(date - 86400000)
  const dateAfter = new Date()
  dateAfter.setTime(date.getTime() + 86400000)

  let today = (parseInt(userDay.slice(2,4)) - 1) + userDay.slice(5,7) + userDay.slice(8)
  let wikiToday = `${parseInt(userDay.slice(8))}_de_${meses[parseInt(userDay.slice(5,7))]}`

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
    .then (response => {
        series = response.data.results
        return series
    })
    .catch (err => {
        console.log(err)
    })   

  let r3 = rp({
                uri: `https://www.trendinalia.com/twitter-trending-topics/spain/spain-${today}.html`,
                transform: function (body) {
                return cheerio.load(body);
                }
              })
          .then($ => {
          
              $('a').each(function(i, elem) {
                      links.push ($(this).attr('href'))
                      titles.push ($(this).text())
              })
              
              links = links.slice(links.indexOf("https://twitter.com/trendinaliaes") + 1, links.indexOf("https://twitter.com/trendinaliaes") + 11)
              titles = titles.slice(titles.indexOf("Seguir a @trendinaliaes") + 1, titles.indexOf("Seguir a @trendinaliaes") + 11)
              
              tuits = []

              titles.forEach((title, idx) => {
                tuits.push([title,links[idx]])
              })
              
              return tuits
          
          })
          .catch(function (err) {
              console.log(err)
          })


  let r4 = axios.get(`https://es.wikipedia.org/w/api.php?action=parse&prop=text&page=Plantilla:Efem%C3%A9rides_-_${wikiToday}&format=json&formatversion=2`)
  .then (response => {
      wiki = response.data.parse.text
      return wiki
  })
  .catch (err => {
      console.log(err)
  })   

//   let r5 = client.games({
//     filters: {
//         'release_dates.date-gt': '2019-03-14',
//         'release_dates.date-lt': '2019-03-16'
//     },
//     limit: 10,
//     offset: 0,
//     order: 'release_dates.date:desc',
//     search: ''
// }, [
//     'name',
//     'release_dates.date',
//     'summary',
//     'platforms',
//     'cover'
// ])
// .then (response => {
//       console.log(response)
//   })
//   .catch (err => {
//       console.log(err)
//   })   


  let r5 = axios({
    url: "https://api-v3.igdb.com/games",
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'user-key': `e946f475539429b55eab2775f5d14022`
    },
    data: `fields name,platforms,storyline,summary,screenshots,release_dates.date; where release_dates.date > ${dateBefore.getTime() / 1000 + 20000} & release_dates.date < ${dateAfter.getTime() / 1000};`
  })
    .then(response => {
      // release_dates.date > 631152000;
      // {data: `fields name; release_dates.date > ${dateBefore.getTime()} & release_dates.date < ${dateAfter.getTime()}; limit 50`},
      // data: `fields game,name,platform; date > ${dateBefore.getTime() / 1000} & date < ${dateAfter.getTime() / 1000}`
        console.log(response.data);
    })
    .catch(err => {
        console.error(err);
    });
  
  Promise.all([r1,r2,r3,r4,r5])
    .then ((response) => {
      res.render('day', {movies, series, tuits, wiki})
      links, titles, tuits = undefined
    })
    .catch (err => {
      console.log(err)
    })
})

module.exports = router;
