module.exports = function(nano, config, next){
  var dbName = config['couch-db'].db;
  nano.db.create(dbName, function(){
    var db = nano.use(dbName);
    next(db);
  });
}
