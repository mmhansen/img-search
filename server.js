var express = require('express');
var app = express();
var mongo = require('mongodb').MongoClient;
var url = 'mongodb://admin:123@ds021326.mlab.com:21326/project';
var routes = require('./app/routes');

mongo.connect(url, function(err, db){
  if(err){console.log(err)}
  else {
    console.log('Connected to db at mlab')
    routes(app,db);
  }
})

var server = app.listen(process.env.PORT || 3000, function(){
  console.log('App listening on port 3000')
});
