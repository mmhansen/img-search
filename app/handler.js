var moment = require('moment'),
    assert = require('assert'),
    request = require('request');

var handler = function(db){
  var history = db.collection('history');

  this.history = function (req, res){
    history.find({})
           .toArray(function(err, doc){
             assert.equal(err, null);
             var history =  doc.map(function(item){
               return {
                 time: item.time,
                 search: item.search
               }
             }).reverse();
             res.json(history);
           })
  }
  this.getImg = function (req, res){
    var time = moment().format('LLL'),
        key = req.params.keys,
        page = req.params.page;

    // add current search to history
    history.insert({
      "time"  : time,
      "search": key
    }, {w:1}, function(err, result){
      assert.equal(err, null);
    })
    // get images from query
    var searchUrl = "https://api.imgur.com/3/gallery/search/time";
    searchUrl += "/" + page;
    searchUrl += "?q_all=" + key;
    console.log(searchUrl);

    var requestOptions = {
      url: searchUrl,
      headers: {
        'Authorization': "Client-Id d8d457b88884e0c"
      }
    }
    request(requestOptions, function(err, response, body){
      assert.equal(err, null)
      var body = JSON.parse(body).data.map(function(item){
        return {
          "title":item.title,
          "link":item.link,
          "views":item.views
        }
      })
      res.json(body);
    })
  }
}

module.exports = handler;
