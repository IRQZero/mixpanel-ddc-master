module.exports = function(io, db){
  var users = io.of('/users');

  users.on('connection', function(socket){
    socket.on('read', function(data){
      socket.emit('read:result', []);
    });
    socket.on('create', function(data){
    });
    socket.on('disconnect', function(){
      console.log('socket disconnected from /teams namespace')
    });

    socket.emit('welcome');
  });
};
