var Base = require("./Base");

module.exports = function(client, aggregate, config){
  return new Base({
    name: 'DrinkTotal',
    client: client,
    aggregate: aggregate,
    config: config,
    keys: [
      'totalBeer',
      'totalWine',
      'totalSpirits'
    ]
  });
};
