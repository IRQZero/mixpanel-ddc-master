module.exports = function(io, db){
  var routes = io.of('/routes'),
    routeArray = [
      {name: 'register'},
      {name: 'bar'},
      {name: 'coat'}
    ];

  routes.on('connection', function(socket){
    socket.on('read', function(data){
      socket.emit('read:result', routeArray);
    });
    socket.on('disconnect', function(){
      console.log('socket disconnected from /routes namespace')
    });

    socket.emit('welcome');
  });
  return routes;
};
