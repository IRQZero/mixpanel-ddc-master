module.exports = function(io, dbs){
  var users = io.of('/users'),
    db = dbs.users;

  users.on('connection', function(socket){
    socket.on('read', function(data){
      socket.emit('read:result', []);
    });
    socket.on('create', function(data){
      db.insert(data, data.id, function(err, result){
        if (err) {
          socket.emit('create:error', err);
        } else {
          socket.emit('create:success');
        }
      });
    });
    socket.on('disconnect', function(){
      console.log('socket disconnected from /teams namespace')
    });

    socket.emit('welcome');
  });
};
