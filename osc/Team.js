var Base = require("./Base");

module.exports = function(client, aggregate, config){
  return new Base({
    name: 'Team',
    client: client,
    aggregate: aggregate,
    config: config,
    keys: [
      "totalTeam1",
      "totalTeam2",
      "totalTeam3",
      "totalTeam4",
      "totalTeam5"
    ]
  })
};
