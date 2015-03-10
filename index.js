var finalhandler = require('finalhandler')
var http = require('http')

var serveStatic = require('serve-static')
var serve = serveStatic('public')

var morgan = require('morgan')
var logger = morgan('dev')


var server = http.createServer(function (req, res) {
  var done = finalhandler(req, res)

  serve(req, res, done)

  logger(req, res, function (err) {
    if (err) return done(err)
  })

})

server.listen(3000)
