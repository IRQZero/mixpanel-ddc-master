var Base = require("./Base");

module.exports = function(client, aggregate, config){
  return new Base({
    name: 'BarTime',
    client: client,
    aggregate: aggregate,
    config: config,
    keys: [
      'drinkServedTime'
    ]
  })
};
