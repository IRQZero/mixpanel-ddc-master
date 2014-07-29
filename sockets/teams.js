module.exports = function(io, db){
  var teams = io.of('/teams'),
    teamArray = [
      {name: 'Purple'},
      {name: 'Blue'},
      {name: 'Green'},
      {name: 'Orange'},
      {name: 'Magenta'}
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
  return teams;
};
