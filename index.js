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
    fs = require("fs");

  var app = express(),
    server = http.Server(app),
    io = socket(server),
    devices = {},
    clients = [],
    aggregate = {
      Attendance: {
        total: {
          People: 0
        }
      },
      BagCheck: {
        total: {
          Coats: {
            val: 0,
            scaled: 0.0
          },
          Purses: {
            val: 0,
            scaled: 0.0
          },
          Bags: {
            val: 0,
            scaled: 0.0
          }
        }
      },
      DrinkTotal: {
        totalBeer: 0,
        totalWine: 0,
        totalSpirits: 0
      },
      BarTime: {
        drinkServedTime: 0
      }
    },
    oscClient = osc.Client(config['data-wall'].host, config['data-wall'].port),
    index = "";

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

  require('./initializers/db')(nano, config, function(db){
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
      require('./sockets/' + socket)(io, db);
    });

    feed = db.follow({include_docs: true, });

    feed.on('change', updateAggregate);

    feed.follow();

  });

  function updateAggregate(change) {
    console.log(change);
  }

  function updateVisual() {
    oscClient.send.apply(oscClient, aggregate);
    setTimeout(updateVisual, config['data-wall'].interval);
  }

  server.listen(config.port);

})();
