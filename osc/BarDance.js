var Base = require("./Base");

module.exports = function(client, aggregate, config){
  var BarDance = new Base({
    name: 'BarDance',
    client: client,
    aggregate: aggregate,
    config: config,
    keys: [
      "totalDrinking",
      "totalDancing"
    ]
  });

  BarDance.sendMessage = function(message){
    var client = this.client;
    message.forEach(function(part){
      if (part == null) return;
      client.send.apply(client, part);
    });
  }
};
