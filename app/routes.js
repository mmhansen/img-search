var express = require('express')
var handler = require("./handler.js");

var routes = function(app, db){
  //create handler obj
  var routeHandler = new handler(db);
  // serve home
  app.use(express.static('./public', [{index:true}]));
  // handle history request
  app.route('/history')
    .get(routeHandler.history)
  // handle img request
  app.route('/:keys/:page')
    .get(routeHandler.getImg)
  // handle bad request
  app.route('/*')
    .get(function(req,res){
      res.json({
        "error":"invalid url"
      })
    })
}

module.exports = routes;
