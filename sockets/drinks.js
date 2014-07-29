module.exports = function(io, dbs){
  var drinks = io.of('/drinks'),
    drinkArray = [
      {name: 'Beer'},
      {name: 'Wine'},
      {name: 'Spirits'}
    ],
    events = dbs.events;

  drinks.on('connection', function(socket){
    socket.on('read', function(data){
      socket.emit('read:result', drinkArray);
    });
    socket.on('create', function(data){
      data.type = "bar";
      events.insert(data, function(err, result){
        if (err) {
          socket.emit('create:error', err);
        } else {
          socket.emit('create:success');
        }
      });
    });
    socket.on('disconnect', function(){
      console.log('socket disconnected from /drinks namespace')
    });

    socket.emit('welcome');
  });
  return drinks;
};
