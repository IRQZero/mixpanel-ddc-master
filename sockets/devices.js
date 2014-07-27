module.exports = function(io, dbs){
  var Deferred = require("simply-deferred").Deferred,
    devicesSocket = io.of('/devices'),
    users = dbs.users,
    events = dbs.events,
    devices = dbs.devices;

  devicesSocket.on('connection', function(socket){

    socket.on('read', function(data){
      if (data === undefined) {
        // register ui asking for list of devices
        devices.list(function(err, records){
          if (err) {
            throw new Error(err);
          }
          socket.emit('read:result', records);
        });
      } else {
        var id = data.macAddress;
        devices.get(id, function(err, body){
          if (err) {
            // create the device if the the err is missing
            if (err.reason === 'missing') {
              devices.insert(data, id, function(err, result){
                if (err) {
                  throw new Error(err);
                } else {
                  data.id = result.id;
                  socket.emit('read:result', data);
                }
              });
            } else {
              throw new Error(err);
            }
          } else {
            socket.emit('read:result', body);
          }
        })
      }
    });
    socket.on('create', function(data){
      data.type = "node";
      var eventData = {},
        dfd = new Deferred();
      users.get(data.userId, function(err, user){

        eventData.user = data.userId;
        eventData.team = user.team;

        if (data.location == null) {
          devices.get(data.macAddress, function(err, device){
            eventData.location = device.location;
            dfd.resolve(eventData);
          });
        } else {
          eventData.location = location;
          dfd.resolve(eventData);
        }
      });

      dfd.done(function(data){
        events.insert(data, function(err, result){
          if (err) {
            socket.emit('create:error', err);
          } else {
            socket.emit('create:success', result);
          }
        });
      });
    });
    socket.on('disconnect', function(){
      console.log('socket disconnected from /drinks namespace')
    });

    socket.emit('welcome');
  });
};
