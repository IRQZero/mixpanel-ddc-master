module.exports = function(io, dbs){
  var Deferred = require("simply-deferred").Deferred,
    devicesSocket = io.of('/devices'),
    users = dbs.users,
    events = dbs.events,
    devices = dbs.devices,
    _ = require("underscore"),
    socketsByMac = {};

  devicesSocket.on('connection', function(socket){

    socket.on('read', function(data){
      if (data == null) {
        // register ui asking for list of devices
        devices.list({include_docs: true}, function(err, result){
          if (err) {
            throw new Error(err);
          }
          socket.emit('read:result', _.pluck(result.rows, 'doc'));
        });
      } else {
        var id = data.macAddress;
        socket.macAddress = id;
        socketsByMac[id] = socket;
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
      var eventData = {
        type: 'node'
      },
        dfd = new Deferred();
      users.get(data.userId, function(err, user){

        if (err) {
          console.log('Unable to find user ' + data.userId);
          dfd.resolve(eventData);
          return;
        }

        eventData.userId = data.userId;
        eventData.user = user;
        eventData.team = user.teamColor;
        eventData.macAddress = data.macAddress;

        if (data.location == null) {
          devices.get(data.macAddress, function(err, device){
            eventData.location = device.location;
            dfd.resolve(eventData);
          });
        } else {
          eventData.location = data.location;
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
    socket.on('update', function(data){
      dbs.devices.get(data.id, function(err, doc){
        if (doc && doc._rev){
          data._rev = doc._rev
        }
        dbs.devices.insert(data, data.id, function(err){
          devicesSocket.emit('update:result', data);
        })
      })
    });

    socket.on('stop', function(data){
      if (socketsByMac[data.id] === undefined) {
        console.error('device not connected', data.id);
        return;
      }
      socketsByMac[data.id].emit('stop');
    });

    socket.on('start', function(data){
      if (socketsByMac[data.id] === undefined) {
        console.error('device not connected', data.id);
        return;
      }
      socketsByMac[data.id].emit('start', data);
    });

    socket.on('disconnect', function(socket){
      delete socketsByMac[socket.macAddress];
      console.log('socket disconnected from /devices namespace')
    });

    socket.emit('welcome');
  });
  return devicesSocket;
};
