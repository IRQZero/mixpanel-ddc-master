module.exports = function(client, aggregate, config){

  function sendMessage(message) {
    message.forEach(function(part){
      console.log(client, part);
      client.send.apply(client, part);
    });
  }

  function encodeMessage(){
    var BagCheck = aggregate.BagCheck;
    return [
      ['/BagCheck/totalCoatsVal', BagCheck.totalCoats.val],
      ['/BagCheck/totalCoatsScaled', BagCheck.totalCoats.scaled],
      ['/BagCheck/totalPursesVal', BagCheck.totalPurses.val],
      ['/BagCheck/totalPursesScaled', BagCheck.totalPurses.scaled],
      ['/BagCheck/totalBagsVal', BagCheck.totalBags.val],
      ['/BagCheck/totalBagsScaled', BagCheck.totalBags.scaled]
    ];
  }

  function beginOnslaught() {
    sendMessage(encodeMessage());
    setTimeout(beginOnslaught, config['data-wall'].channels.BagCheck);
  }

  beginOnslaught();
};
