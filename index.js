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
    _ = require("underscore");

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
        totalCoats: {
          val: 0,
          scaled: 0.0
        },
        totalPurses: {
          val: 0,
          scaled: 0.0
        },
        totalBags: {
          val: 0,
          scaled: 0.0
        }
      },
      DrinkTotal: {
        totalBeer: 0,
        totalWine: 0,
        totalSpirits: 0
      },
      BarTime: {
        lastTwenty: [],
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
      require('./sockets/' + socket)(io, dbs);
    });

    feed = dbs.events.follow({include_docs: true, });

    feed.on('change', updateAggregate);

    feed.follow();

  });

  function updateAggregate(change) {
    var doc = change.doc;
    switch (doc.type) {
      case 'bar':
        var drinkTotal = aggregate.DrinkTotal,
          barTime = aggregate.BarTime;

        drinkTotal.totalBeer += doc.Beer;
        drinkTotal.totalWine += doc.Wine;
        drinkTotal.totalSpirits += doc.Spirits;

        barTime.lastTwenty.push(doc.time);
        while (barTime.lastTwenty.length > 20) {
          barTime.lastTwenty.shift();
        }
        barTime.drinkServedTime = _.reduce(barTime.lastTwenty, function(m, n){
          return m += n;
        }, 0) / barTime.lastTwenty.length;
        break;
      case 'bag':
        var bagCheck = aggregate.BagCheck,
          total, coats, purses, bags;

        bagCheck.totalCoats.val += doc.Coat;
        bagCheck.totalPurses.val += doc.Purse;
        bagCheck.totalBags.val += doc.Luggage;

        coats = bagCheck.totalCoats.val;
        purses = bagCheck.totalPurses.val;
        bags = bagCheck.totalBags.val;

        total = coats + purses + bags;
        bagCheck.totalCoats.scaled = total / coats * 100;
        bagCheck.totalPurses.scaled = total / purses * 100;
        bagCheck.totalBags.scaled = total / bags * 100;

        break;
      case 'node':
        // lookup user id in userDb and get info to fill out team data
        break;
    }
    console.log(aggregate);
  }

  function updateVisual(channel, interval) {
    oscClient.send.apply(oscClient, aggregate);
    setTimeout(updateVisual, config['data-wall'].interval);
  }

  server.listen(config.port);

})();
