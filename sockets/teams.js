module.exports = function(io, db){
  var teams = io.of('/teams'),
    teamArray = [
      {name: 'Blue'},
      {name: 'Teal'},
      {name: 'Orange'},
      {name: 'Purple'},
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
};
