var Base = require("./Base");

module.exports = function(client, aggregate, config){
  return new Base({
    name: 'EnterExit',
    client: client,
    aggregate: aggregate,
    config: config,
    keys: [
      'enterVal'
      'enterScaled'
      'exitVal'
      'exitScaled'
      'timestamp'
    ]
  })
};
