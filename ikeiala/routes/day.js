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

const h2p = require('html2plaintext')

let movies = undefined
let games = undefined
let series = undefined
let wiki = undefined
let tomorrow = undefined
let yesterday = undefined
let titles = []
let links = []
let tuits = []
let meses = ["", "enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]

router.post('/', (req, res, next) => {

  const userDay = req.body.date
  const year = parseInt(userDay.slice(0,4))
  const month = parseInt(userDay.slice(5,7)) - 1
  const day = parseInt(userDay.slice(8,10))

  Day.find({"title":userDay})
  .populate(`movies`)
  .populate(`series`)
  .populate(`tuits`)
  .populate(`wikis`)
  .populate(`games`)
  .populate({path : 'comments', populate : {path : 'author'}}) 
    .then(response => {
      if(response.length>0){
        console.log(response[0].comments)
        res.render('day', {movies:response[0].movies, series:response[0].series,tuits: response[0].tuits, wiki: response[0].wikis, games: response[0].games, comments: response[0].comments,id: response[0]._id, dayTitle: userDay, user: req.user})
      } else {
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
      
        let r1 = axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.MOVIEAPIKEY}&language=es-ES&region=ES&sort_by=popularity.desc&include_adult=false&release_date.gte=${yesterday}&release_date.lte=${tomorrow}&with_release_type=2|3`)
    .then (response => {
      movies = response.data.results
      return movies
    })
    .catch (err => {
      console.log(err)
    })
 
  let r2 = axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.MOVIEAPIKEY}&language=es-ES&sort_by=popularity.desc&air_date.gte=${yesterday}&air_date.lte=${tomorrow}&timezone=Europe%2FMadrid&include_null_first_air_dates=false`)
    .then (response => {
        series = response.data.results
 
        series = series.filter(show => {
          return show.hasOwnProperty("overview") && show.overview !== "" && (show.original_language === "en" || show.original_language === "es")
        })
 
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
                tuits.push({title,link:links[idx]})
              })
             
              return tuits
         
          })
          .catch(function (err) {
              console.log(err)
          })
 
          console.log(wikiToday)
  let r4 = axios.get(`https://es.wikipedia.org/w/api.php?action=parse&prop=text&page=Plantilla:Efem%C3%A9rides_-_${wikiToday}&format=json&formatversion=2`)
  .then (response => {

      wiki = response.data.parse.text
      wiki = wiki.split("<!--")
      wiki = wiki[0].split("</div>")
      img = wiki[0].split("srcset=")[1].split(",")[1].trim().split(" ")[0]
      body = wiki[1].trim()
      body = body.substring(4,body.length - 5).split("\n")
 
      let years = body.map (wiki => {
        let newWiki = ""
        newWiki = wiki.split("</a>")[0].split(">")
        newWiki = newWiki[newWiki.length - 1]
        return newWiki
      })
 
      let links = body.map (wiki => {
        let newWiki = ""
        let lastIndexOf = wiki.lastIndexOf("</b>")
        newWiki = wiki.substring(0,lastIndexOf)
        newWiki = newWiki.split("<b>")
        newWiki = newWiki[newWiki.length - 1].trim().split(" ")[1]
        newWiki = newWiki.substring(6,newWiki.length - 1)
        newWiki = "https://es.wikipedia.org" + newWiki
        return newWiki
      })
 
      let descriptions = body.map (wiki => {
        newWiki = h2p(wiki)
        newWiki = newWiki.split(" ")
        newWiki.shift()
        return newWiki.join(" ")
      })
 
      wikis = []
       
      years.forEach((year,idx) => {
        wikis.push({year:year,description:descriptions[idx],link:links[idx]})
      })
 
      return {img:img,wikis:wikis}
     
  })
  .catch (err => {
      console.log(err)
  })  
 
 
 
  let r5 = axios({
    url: "https://api-v3.igdb.com/games",
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'user-key': process.env.GAMEAPIKEY
    },
    data: `fields name,platforms,summary,url,release_dates.date; where release_dates.date > ${dateBefore.getTime() / 1000 + 20000} & release_dates.date < ${dateAfter.getTime() / 1000};`
  })
    .then(response => {
        games = response.data
        console.log(games)
        return games
    })
    .catch(err => {
        console.error(err);
    });
        
  
        Promise.all([r1,r2,r3,r4,r5])
          .then ((response) => {
            let createdMovies = Movie.insertMany(response[0])
            let createdSeries = Serie.insertMany(response[1])
            let createdTuits = Tuit.insertMany(response[2])
            let createdWiki = Wiki.create(response[3])
            let createdGames =  Game.insertMany(response[4])
  
            Promise.all([createdMovies,createdSeries,createdTuits,createdWiki,createdGames])
              .then(creations => {
                let newday = {
                  title:userDay,
                  description:`WUNDERBAR`,
                  movies: [],
                  series: [],
                  tuits: [],
                  games: [],
                  wikis: []
                }
                creations[0].forEach(elm=>newday.movies.push(elm._id))
                creations[1].forEach(elm=>newday.series.push(elm._id))
                creations[2].forEach(elm=>newday.tuits.push(elm._id))
                newday.wikis.push(creations[3]._id)
                creations[4].forEach(elm=>newday.games.push(elm._id))
  
                Day.create(newday)
                  .then(day => {
                    res.render('day', {movies:creations[0], series:creations[1], tuits: creations[2], wiki: creations[3], games: creations[4], id: day._id, dayTitle: userDay, user: req.user})
                    console.log("day created")
                  })
                  .catch(err=>console.log(`error creating the new day`, err))
                
                links, titles, tuits = undefined  
              })
  
            
          })
          .catch (err => {
            console.log(err)
          })
      }
      
    })
    .catch(err=> console.log(err))


  
})

module.exports = router;
