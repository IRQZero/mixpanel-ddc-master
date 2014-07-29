var osc = require("node-osc");
var util = require('util');

var oscServer = new osc.Server(10000, '0.0.0.0');
oscServer.on("message", function (msg, rinfo) {
    console.log("Message:");
    console.log(msg);
});