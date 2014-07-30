function Nodes(params){
  this.aggregator = params.aggregator;
}

Nodes.prototype = {
  locationMap: {
    "Glow Bar": 1,
    "S Bar": 2,
    "U Bar": 3,
    "Coat Check": 4,
    "Catering": 5,
    "Art Installation": 6,
    "Data Wall": 7,
    "Presentation Area": 8,
    "Lounge": 9,
    "Dance Floor": 10,
    "Entrance": 11,
    "Exit": 12
  },
  teamMap: {
    'Blue': 1,
    'Green': 2,
    'Orange': 3,
    'Magenta': 4,
    'Purple': 5
  },
  locationTotals: {
    "Glow Bar": 0,
    "S Bar": 0,
    "U Bar": 0,
    "Coat Check": 0,
    "Catering": 0,
    "Art Installation": 0,
    "Data Wall": 0,
    "Presentation Area": 0,
    "Lounge": 0,
    "Dance Floor": 0,
    "Entrance": 0,
    "Exit": 0,
    "All": 0
  },
  'handleMessage': function(doc){
    console.log(doc.location);
    if (typeof this[doc.location] === 'function') {
      this[doc.location](doc);
    }
    this.always(doc);
  },
  'always': function(doc){
    var EnterExit = this.aggregator.data.EnterExit,
      BarDance = this.aggregator.data.BarDance,
      zones = this.aggregator.data.zones,
      enterVal = EnterExit.enterVal,
      exitVal = EnterExit.exitVal;

    EnterExit.enterScaled = enterVal / 500;
    EnterExit.exitScaled = exitVal / 500;
    EnterExit.timestamp = parseInt((new Date()).getTime() / 1000, 10);

    BarDance.totalPresentation = zones.Presentation.length;
    BarDance.totalDrinking = zones.Drinking.length;
    BarDance.totalCatering = zones.Catering.length;
    BarDance.totalDancing = zones.Dancing.length;

    if (doc.location) {
      this.aggregateLocation(doc);
    }

  },
  clearZones: function(userId){
    var zones = this.aggregator.data.zones;
    ['Drinking', 'Catering', 'Presentation', 'Dancing'].forEach(function(zone){
      zones[zone] = _.without(zones[zone], userId);
    });
  },
  'aggregateZone': function(zone, userId){
    var zones = this.aggregator.data.zones;
    if (zones[zone].indexOf(userId) < 0) {
      this.clearZones(userId);
      zones[zone].push(userId);
    }
  },
  'aggregateLocation': function(doc){
    this.locationTotals[doc.location]++;
    this.locationTotals.All++;
    this.aggregator.data.InteractionMap.locationId = this.locationMap[doc.location];
    this.aggregator.data.InteractionMap.locationTotal = this.locationTotals[doc.location];
    this.aggregator.data.InteractionMap.teamIndex = this.teamMap[doc.team];
    this.aggregator.data.InteractionMap.totalInteractions = this.locationTotals.All;
  },
  'Glow Bar': function(doc){
    this.aggregateZone('Drinking', doc.userId);
  },
  'S Bar': function(doc){
    this.aggregateZone('Drinking', doc.userId);
  },
  'U Bar': function(doc){
    this.aggregateZone('Drinking', doc.userId);
  },
  'Outside Bar': function(doc){
    this.aggregateZone('Drinking', doc.userId);
  },
  'Presentation Area': function(doc){
    this.aggregateZone('Presentation', doc.userId);
  },
  'Dance Floor': function(){
    this.aggregateZone('Dancing', doc.userId);
  },
  'Entrance': function(){
    this.aggregator.data.EnterExit.enterVal++;
  },
  'Exit': function(){
    this.aggregator.data.EnterExit.exitVal++;
  }
};

module.exports = Nodes;
