var Base = require("./Base");

module.exports = function(client, aggregate, config){
  return new Base({
    name: 'InteractionMap',
    client: client,
    aggregate: aggregate,
    config: config,
    keys: [
      "locationIndex",
      "locationTotal",
      "teamIndex",
      "totalInteractions"
    ]
  });
};
