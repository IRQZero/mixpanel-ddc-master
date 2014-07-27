module.exports = function(io, db){
  var drinks = io.of('/drinks'),
    drinkArray = [
      {name: 'Beer'},
      {name: 'Wine'},
      {name: 'Spirits'}
    ];

  drinks.on('connection', function(socket){
    socket.on('read', function(data){
      socket.emit('read:result', drinkArray);
    });
    socket.on('create', function(data){
      db.insert(data, function(err, result){
        if (err) {
          socket.emit('create:error', err);
        } else {
          socket.emit('create:result', result);
        }
      });
    });
    socket.on('disconnect', function(){
      console.log('socket disconnected from /drinks namespace')
    });

    socket.emit('welcome');
  });
};
