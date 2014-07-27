module.exports = function(io){
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
    socket.on('disconnect', function(){
      console.log('socket disconnected from /drinks namespace')
    });

    socket.emit('welcome');
  });
};
