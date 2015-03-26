var finalhandler = require('finalhandler')
var http = require('http')

var fs = require('fs')
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'})

var serveStatic = require('serve-static')
var serve = serveStatic('public')

var morgan = require('morgan')
var logger = morgan('dev', {stream: accessLogStream})

var server = http.createServer(function (req, res) {
  var done = finalhandler(req, res)

  serve(req, res, done)

  logger(req, res, function (err) {
    if (err) return done(err)
  })

})

server.listen(3000)
