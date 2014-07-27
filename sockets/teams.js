module.exports = function(io){
  var teams = io.of('/teams'),
    teamArray = [
      {name: 'red'},
      {name: 'blue'},
      {name: 'yellow'},
      {name: 'green'}
    ];

  teams.on('connection', function(socket){
    socket.on('read', function(data){
      socket.emit('read:result', teamArray);
    });
    socket.on('disconnect', function(){
      console.log('socket disconnected from /teams namespace')
    });

    socket.emit('welcome');
  });
};
