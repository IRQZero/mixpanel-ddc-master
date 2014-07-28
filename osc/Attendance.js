var Base = require("./Base");

module.exports = function(client, aggregate, config){
  return new Base({
    name: 'Attendance',
    client: client,
    aggregate: aggregate,
    config: config,
    keys: [
      'totalPeople'
    ]
  })
};
