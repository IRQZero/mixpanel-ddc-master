var Base = require("./Base");

module.exports = function(client, aggregate, config){
  return new Base({
    name: 'BarDance',
    client: client,
    aggregate: aggregate,
    config: config,
    keys: [
      "totalDrinking",
      "totalDancing"
    ]
  });
};
