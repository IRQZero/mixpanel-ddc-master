var socket = require("socket.io");

var socket = io('http://10.10.200.40');

  socket.on('connect', function (data) {

    console.log(data);
		socket.emit('read', {macAddress: "e4:ce:8f:27:6d:34"});
  });

  socket.on('read:result', function(data){
	    console.log(data);
	});

  

