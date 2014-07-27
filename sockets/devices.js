module.exports = function(io, db){
  var devices = io.of('/devices'),
    deviceArray = [];

  devices.on('connection', function(socket){
    socket.on('read', function(data){
      socket.emit('read:result', deviceArray);
    });
    socket.on('create', function(data){
      db.insert(data, function(err, result){
        if (err) {
          socket.emit('create:error', err);
        } else {
          socket.emit('create:success', result);
        }
      });
    });
    socket.on('disconnect', function(){
      console.log('socket disconnected from /drinks namespace')
    });

    socket.emit('welcome');
  });
};
