var Base = require("./Base");

module.exports = function(client, aggregate, config){
  return new Base({
    name: 'BagCheck',
    client: client,
    aggregate: aggregate,
    config: config,
    keys: [
      "totalCoatsVal",
      "totalCoatsScaled",
      "totalPursesVal",
      "totalPursesScaled",
      "totalBagsVal",
      "totalBagsScaled"
    ]
  });
};
