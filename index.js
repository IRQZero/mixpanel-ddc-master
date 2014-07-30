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
        totalPeople: 210
      },
      BagCheck: {
        totalCoatsVal: 0,
        totalCoatsScaled: 0.0,
        totalPursesVal: 0,
        totalPursesScaled: 0.0,
        totalBagsVal: 0,
        totalBagsScaled: 0.0
      },
      BarDance: {
        totalPresentation: 0,
        totalCatering: 0,
        totalDrinking: 0,
        totalDancing: 0
      },
      BarTime: {
        lastTwenty: [],
        drinkServedTime: 0
      },
      DrinkTotal: {
        totalBeer: 0,
        totalWine: 0,
        totalSpirits: 0
      },
      zones: {
        Drinking: [],
        Catering: [],
        Presentation: [],
        Dancing: []
      },
      EnterExit: {
        enterVal: 0,
        enterScaled: 0,
        exitVal: 0,
        exitScaled: 0,
        timestamp: 0
      },
      InteractionMap: {
        interactions: [],
        locationIndex: 0,
        locationTotal: 0,
        teamIndex: 0,
        totalInteractions: 0
      },
      Team: {
        totalTeam1: 0,
        totalTeam2: 0,
        totalTeam3: 0,
        totalTeam4: 0,
        totalTeam5: 0
      }
    },
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
      require('./osc/' + channel)(oscClient, aggregate, config);
    });

    feed = dbs.events.follow({include_docs: true, });

    feed.on('change', updateAggregate);

    feed.follow();

  });

  function updateAggregate(change) {
    var doc = change.doc;

    if (doc.team) {
      console.log("Got message for team " + doc.team);
      aggregate.Team['total' + teamMap[doc.team]]++;
      var data = _.chain(Object.keys(aggregate.Team)).map(function(key){
        return {
          team: teamMap[key],
          score : aggregate.Team[key],
          user: doc.team,
          macAddress: doc.macAddress
        };
      }).reduce(function(m, team){
        if (team.score > m.score) {
          return team;
        }
        return m;
      },{team: '', user: '', macAddress: '', score: 0}).value();


      Object.keys(sockets.devices.connected).map(function(key){
        return sockets.devices.connected[key];
      }).forEach(function(socket){
        socket.emit('team:result', data);
      });
    }

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

        bagCheck.totalCoatsVal += doc.Coat;
        bagCheck.totalPursesVal += doc.Purse;
        bagCheck.totalBagsVal += doc.Luggage;

        coats = bagCheck.totalCoatsVal;
        purses = bagCheck.totalPursesVal;
        bags = bagCheck.totalBagsVal;

        total = coats + purses + bags;
        bagCheck.totalCoatsScaled = coats / total *  100;
        bagCheck.totalPursesScaled = purses / total * 100;
        bagCheck.totalBagsScaled = bags / total * 100;

        break;
      case 'node':
        function clearZones(userId) {
          ['Drinking', 'Catering', 'Presentation', 'Dancing'].forEach(function(zone){
            aggregate.zones[zone] = _.without(aggregate.zones[zone], userId);
          });
        }

        switch(doc.location) {
          case 'Glow Bar':
          case 'S Bar':
          case 'U Bar':
          case 'Outside Bar':
            if (aggregate.zones.Drinking.indexOf(doc.userId) < 0) {
              clearZones(doc.userId);
              aggregate.zones.Drinking.push(doc.userId);
            }
            break;
          case 'Coat Check':
            break;
          case 'Catering':
            if (aggregate.zones.Catering.indexOf(doc.userId) < 0) {
              clearZones(doc.userId);
              aggregate.zones.Catering.push(doc.userId);
            }

            break;
          case 'Art Installation':
            break;
          case 'Data Wall':
            break;
          case 'Presentation Area':
            if (aggregate.zones.Presentation.indexOf(doc.userId) < 0) {
              clearZones(doc.userId);
              aggregate.zones.Presentation.push(doc.userId);
            }
            break;
          case 'Lounge':
            break;
          case 'Dance Floor':
            if (aggregate.zones.Dancing.indexOf(doc.userId) < 0) {
              clearZones(doc.userId);
              aggregate.zones.Dancing.push(doc.userId);
            }
            break;
          case 'Entrance':
            aggregate.EnterExit.enterVal++;
            var enterVal = aggregate.EnterExit.enterVal;
            break;
          case 'Exit':
            aggregate.EnterExit.exitVal++;
            var exitVal = aggregate.EnterExit.exitVal;
            break;
        }
        aggregate.EnterExit.enterScaled = enterVal / (enterVal + exitVal) * 100;
        aggregate.EnterExit.exitScaled = exitVal / (enterVal + exitVal) * 100;
        aggregate.EnterExit.timestamp = (new Date()).getTime();
        aggregate.BarDance.totalPresentation = aggregate.zones.Presentation.length;
        aggregate.BarDance.totalDrinking = aggregate.zones.Drinking.length;
        aggregate.BarDance.totalCatering = aggregate.zones.Catering.length;
        aggregate.BarDance.totalDancing = aggregate.zones.Dancing.length;

        break;
    }
  }

  function updateVisual(channel, interval) {
    oscClient.send.apply(oscClient, aggregate);
    setTimeout(updateVisual, config['data-wall'].interval);
  }



  server.listen(config.port);

})();
