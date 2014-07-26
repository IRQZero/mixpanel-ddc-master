(function(){
  var express = require("express"),
    http = require("http"),
    nano = require("nano")("http://localhost:5984"),
    socket = require("socket.io"),
    nodeStatic = require("serve-static"),
    bodyParser = require("body-parser");

  var app = express(),
    server = http.Server(app),
    io = socket(server),
    devices = {},
    clients = [];

  app.get('register', function(req, res){
    var macAddress = req.body.macAddress,
      device = devices[macAddress];

    if (device == null) {
      devices[macAddress] = req.body;
      device = devices[macAddress];
    }

    if (device.location == null) {
      res.json({status: "wait"});
    } else {
      res.json(device);
    }
  });

  app.get('location', function(req, res){

  });

  app.post('user', function(req, res){

  });

  app.use(nodeStatic(__dirname + "/public"));
  app.use(bodyParser.json());

  io.on('connection', function(socket){
    clients.push(socket);
    socket.emit("welcome", {});
    socket.on('ido', function(job){
      switch( job ){
        case 'register':
          socket.on('register-device', function(device, location){
            devices[device].location = location;
          });
          break;
        case 'bar':
          socket.on('order-drink', function(user, drink){

          });
          break;
        case 'coatcheck':
          socket.on('check-coat', function(user, coat){

          });
          break;
        default:
          throw new Error('Invalid job sent');
          break;
      }
    });
  });

  server.listen(8000);

})();
