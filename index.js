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
    coffeeMiddle = require("coffee-middleware"),
    fs = require("fs"),
    _ = require("underscore"),
    Aggregator = require('./lib/aggregator');

  var app = express(),
    server = http.Server(app),
    io = socket(server),
    devices = {},
    clients = [],
    teamMap = {
      Blue : "Team1",
      Green : "Team2",
      Orange : "Team3",
      Magenta : "Team4",
      Purple : "Team5",
      totalTeam1 : "Blue",
      totalTeam2 : "Green",
      totalTeam3 : "Orange",
      totalTeam4 : "Magenta",
      totalTeam5 : "Purple"
    },
    oscClient = new osc.Client(config['data-wall'].host, config['data-wall'].port),
    index = "",
    sockets = {};

  fs.readFile(__dirname+'/public/index.html', function(err, content){
    if (err) {
      throw new Error("Unablet to load index.html file");
    }
    index = content;
  });

  app.use(coffeeMiddle({
    src: __dirname+'/public',
    compress: env === "production"
  }));

  app.use(less(__dirname + "/public", config.less));
  app.use(nodeStatic(__dirname + "/public"));
  app.use(bodyParser.json());
  app.all('*', function(req, res){
    res.end(index);
  });

  require('./initializers/db')(nano, config, function(dbs){
    // initialize all the socket namespaces with the socket and the db
    [
      'routes',
      'drinks',
      'teams',
      'coats',
      'devices',
      'locations',
      'users'
    ].map(function(socket){
      sockets[socket] = require('./sockets/' + socket)(io, dbs);
    });

    console.log(sockets);

    var aggregator = new Aggregator({
      dbs: dbs,
      sockets: sockets,
      config: config,
      replay: env === 'development'
    });

    [
      'Attendance',
      'BagCheck',
      'BarDance',
      'BarTime',
      'DrinkTotal',
      'EnterExit',
      'InteractionMap',
      'Team'
    ].map(function(channel){
      require('./osc/' + channel)(oscClient, aggregator.data, config);
    });


  });

  server.listen(config.port);

})();
