module.exports = function(io){
  var locations = io.of('/locations'),
    locationArray = [
      {name: "Glow Bar"},
      {name: "S Bar"},
      {name: "U Bar"},
      {name: "Coat Check"},
      {name: "Catering"},
      {name: "Art Installation"},
      {name: "Data Wall (changed)"},
      {name: "Presentation Area"},
      {name: "Lounge (added to list)"},
      {name: "Dance Floor"},
      {name: "Entrance (added to list)"},
      {name: "Exit (added to list)"},
    ];

  locations.on('connection', function(socket){
    socket.on('read', function(data){
      socket.emit('read:result', locationArray);
    });
    socket.on('create', function(data){
      console.log(data);
    });
    socket.on('disconnect', function(){
      console.log('socket disconnected from /drinks namespace')
    });

    socket.emit('welcome');
  });
};
