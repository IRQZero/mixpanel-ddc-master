module.exports = function(client, aggregate, config){

  function sendMessage(message) {
    message.forEach(function(part){
      client.send.apply(client, part);
    });
  }

  function encodeMessage(){
    var Attendance = aggregate.Attendance;
    return [
      ['/Attendance/totalPeople', Attendance.totalPeople]
    ];
  }

  function beginOnslaught() {
    sendMessage(encodeMessage());
    setTimeout(beginOnslaught, config['data-wall'].channels.Attendance);
  }

  beginOnslaught();
};
