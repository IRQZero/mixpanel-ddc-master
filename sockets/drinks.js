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
      console.log('got create message', data);
      db.insert(data, function(err, result){
        if (err) {
          socket.emit('create:error', err);
        } else {
          console.log('finished inserting');
          socket.emit('create:success');
        }
      });
    });
    socket.on('disconnect', function(){
      console.log('socket disconnected from /drinks namespace')
    });

    socket.emit('welcome');
  });
};
