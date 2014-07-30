var Nodes = require('./nodes'),
  _ = require('underscore');

function Aggregator(params) {
  this.dbs = params.dbs;
  this.sockets = params.sockets;
  this.config = params.config;
  this.nodes = new Nodes({
    aggregator: this
  });
  // set the initial values
  this.data = {
    Attendance: {
      totalPeople: 0
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
  };
  this.initialize(params);
}

Aggregator.prototype = {
  teamMap: {
    Blue : "Team1",
    Green : "Team2",
    Orange : "Team3",
    Magenta : "Team4",
    Purple : "Team5",
    Team1 : "Blue",
    Team2 : "Green",
    Team3 : "Orange",
    Team4 : "Magenta",
    Team5 : "Purple"
  },
  initialize: function(params){
    var options = {
      include_docs: true
    };
    if (!params.replay) {
      options.since = 'now';
    }
    this.feed = this.dbs.events.follow(options);

    this.feed.on('change', this.handleEvent.bind(this));

    this.feed.follow();
  },
  handleEvent: function(change){

    var doc = change.doc;

    if (doc.team) {
      this.incrementTeam(doc.team);
      this.sendTeamData(doc);
    }

    if (typeof this[doc.type] === 'function') {
      this[doc.type](doc);
    }
  },

  incrementTeam: function(team) {
    this.data.Team['total' + this.teamMap[team]]++;
  },

  sendTeamData: function(doc) {
    var data = _.chain(Object.keys(this.data.Team)).map(function(key){
      return {
        team: this.teamMap[key],
        score : this.data.Team[key],
        user: doc.team,
        macAddress: doc.macAddress
      };
    }, this).reduce(function(m, team){
      if (team.score > m.score) {
        return team;
      }
      return m;
    },{team: '', user: '', macAddress: '', score: 0}).value();

    Object.keys(this.sockets.devices.connected).map(function(key){
      return this.sockets.devices.connected[key];
    }).forEach(function(socket){
      socket.emit('team:result', data);
    });

  },

  bar: function(doc){
    var drinkTotal = this.data.DrinkTotal,
      barTime = this.data.BarTime;

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
  },

  bag: function(doc){
    var bagCheck = this.data.BagCheck,
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

  },

  node: function(doc){
    this.nodes.handleMessage(doc);
  }
};

module.exports = Aggregator;
