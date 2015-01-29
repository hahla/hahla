var express = require('express')
var app = express()
// var map = require('map.json')

fs = require('fs')
fs.readFile('game.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  game = JSON.parse(data);
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/hi', function (req, res, next) {
    console.log('asdf');
    res.jsonp({hi: 'world!'});
});

app.post('/game', function(req, res, next){
    console.log('in game');
    res.jsonp(game)
})

var server = app.listen(3000, 'localhost', function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Example app listening at http://%s:%s', host, port)
})

