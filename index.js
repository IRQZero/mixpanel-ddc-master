(function(){
  var env = process.env['NODE_ENV'] || 'development',
    config = require('./config/' + env + '.json'),
    express = require("express"),
    http = require("http"),
    nano = require("nano")("http://" + config['couch-db'].host + ":" + config['couch-db'].port + ""),
    socket = require("socket.io"),
    nodeStatic = require("serve-static"),
    osc = require("node-osc"),
    bodyParser = require("body-parser"),
    less = require("less-middleware"),
    coffeeMiddle = require("coffee-middleware");

  var app = express(),
    server = http.Server(app),
    io = socket(server),
    devices = {},
    clients = [],
    aggregate = [],
    oscClient = osc.Client(config['data-wall'].host, config['data-wall'].port);

  app.use(coffeeMiddle({
    src: __dirname+'/public',
    compress: env === "production"
  }));

  app.use(less(__dirname + "/public", config.less));
  app.use(nodeStatic(__dirname + "/public"));
  app.use(bodyParser.json());
  app.all('*', function(req, res){
    res.redirect('/');
  });

  var routes = io.of('/routes'),
    routeArray = [
      {name: 'register'},
      {name: 'bar'},
      {name: 'coat'}
    ];

  routes.on('connection', function(socket){
    socket.on('read', function(data){
      socket.emit('read:result', routeArray);
    });
    socket.on('create', function(data){
      var result = _.findWhere(routesArray, data);
      if (!result) {
        routesArray.push(data);
      }
      socket.emit('create:result', routeArray);
    });

    socket.on('disconnect', function(){
      console.log('socket disconnected from /routes namespace')
    });

    socket.emit('welcome');
  });

  io.on('connection', function(socket){
    clients.push(socket);
    socket.emit("welcome", {});
    socket.on('ido', function(job){
      switch( job ){
        case 'node':

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

  function updateVisual() {
    oscClient.send.apply(oscClient, aggregate);
    setTimeout(updateVisual, config['data-wall'].interval);
  }

  server.listen(config.port);

})();
