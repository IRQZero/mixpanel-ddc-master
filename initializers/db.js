module.exports = function(nano, config, next){
  var Deferred = require("simply-deferred").Deferred;
  var when = require("simply-deferred").when;
  var dbNames = config['couch-db'].dbs;
  var dbs = {};
  var promises = [];

  when.apply(Deferred, Object.keys(dbNames).map(function(name){
    var dfd = new Deferred();
    nano.db.create(dbNames[name], function(){
      var db = nano.use(name);
      dbs[name] = db;
      dfd.resolve({name: name, db: db});
    });
    return dfd.promise();
  })).done(function(){
    next(dbs);
  });

}
