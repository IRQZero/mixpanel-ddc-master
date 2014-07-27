module.exports = function(io){
  var drinks = io.of('/drinks'),
    drinkArray = [
      {name: 'beer'},
      {name: 'wine'},
      {name: 'cocktail'}
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
