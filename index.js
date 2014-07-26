(function(){
  var express = require("express"),
    nano = require("nano"),
    socket = require("socket.io"),
    nodeStatic = require("serve-static");

  var app = express();

  app.get('register', function(req, res){
    
  });

  app.get('location', function(req, res){

  });

  app.get('user', function(req, res){

  });

  app.use(nodeStatic(__dirname + "/public"));
  app.listen(8000);

})();
