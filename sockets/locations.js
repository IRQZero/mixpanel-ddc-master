module.exports = function(io, db){
  var locations = io.of('/locations'),
    locationArray = [
      {name: "Glow Bar"},
      {name: "S Bar"},
      {name: "U Bar"},
      {name: "Outside Bar"},
      {name: "Coat Check"},
      {name: "Catering"},
      {name: "Art Installation"},
      {name: "Data Wall"},
      {name: "Presentation Area"},
      {name: "Lounge"},
      {name: "Dance Floor"},
      {name: "Entrance"},
      {name: "Exit"}
    ];

  locations.on('connection', function(socket){
    socket.on('read', function(data){
      socket.emit('read:result', locationArray);
    });
    socket.on('disconnect', function(){
      console.log('socket disconnected from /drinks namespace')
    });

    socket.emit('welcome');
  });
};
