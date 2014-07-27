module.exports = function(io, dbs){
  var coats = io.of('/coats'),
    coatArray = [
      {name: 'Coat'},
      {name: 'Purse'},
      {name: 'Luggage'}
    ],
    events = dbs.events;

  coats.on('connection', function(socket){
    socket.on('read', function(data){
      socket.emit('read:result', coatArray);
    });
    socket.on('create', function(data){
      data.type = "bag";
      events.insert(data, function(err, result){
        if (err) {
          socket.emit('create:error', err);
        } else {
          socket.emit('create:success', result);
        }
      });
    });
    socket.on('disconnect', function(){
      console.log('socket disconnected from /coats namespace')
    });

    socket.emit('welcome');
  });
};
