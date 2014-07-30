function BaseOscChannel(params){
  this.name = params.name;
  this.client = params.client;
  this.data = params.aggregate[this.name];
  this.keys = params.keys;
  this.config = params.config;
  this.interval = params.config['data-wall'].channels[this.name];
  this.initialize.apply(this, arguments);
};


BaseOscChannel.prototype = {
  formatter: function(key){
    return ['/' + this.name + '/' + key, this.data[key]];
  },

  sendMessage: function (message) {
    var client = this.client;
    message.forEach(function(part){
      if (part == null) return;
      client.send.apply(client, part);
    });
  },

  encodeMessage: function (){
    return this.keys.map(this.formatter, this);
  },

  beginOnslaught: function () {
    this.sendMessage(this.encodeMessage());
    setTimeout(this.beginOnslaught.bind(this), this.interval);
  },

  initialize: function(){
    this.beginOnslaught();
  }
};

module.exports = BaseOscChannel;
