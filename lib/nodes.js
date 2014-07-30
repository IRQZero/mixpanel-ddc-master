function Nodes(params){
  this.aggregator = params.aggregator;
}

Nodes.prototype = {
  'handleMessage': function(doc){
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

    EnterExit.enterScaled = enterVal / (enterVal + exitVal);
    EnterExit.exitScaled = exitVal / (enterVal + exitVal);
    EnterExit.timestamp = (new Date()).getTime();

    BarDance.totalPresentation = zones.Presentation.length;
    BarDance.totalDrinking = zones.Drinking.length;
    BarDance.totalCatering = zones.Catering.length;
    BarDance.totalDancing = zones.Dancing.length;

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
  'Coat Check': function(){

  },
  'Catering': function(){

  },
  'Art Installation': function(){

  },
  'Data Wall': function(){

  },
  'Presentation Area': function(doc){
    this.aggregateZone('Presentation', doc.userId);
  },
  'Lounge': function(){

  },
  'Dance Floor': function(){
    this.aggregateZone('Dancing', doc.userId);
  },
  'Entrance': function(){
    this.aggregator.EnterExit.enterVal++;
  },
  'Exit': function(){
    this.aggregator.EnterExit.exitVal++;
  }
};
