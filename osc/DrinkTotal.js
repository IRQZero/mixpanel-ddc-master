module.exports = function(client, aggregate, config){

  function sendMessage(message) {
    message.forEach(function(part){
      console.log(client, part);
      client.send.apply(client, part);
    });
  }

  function encodeMessage(){
    var DrinkTotal = aggregate.DrinkTotal;
    return [
      ['/DrinkTotal/totalBeer', DrinkTotal.totalBeer],
      ['/DrinkTotal/totalWine', DrinkTotal.totalWine],
      ['/DrinkTotal/totalSpirits', DrinkTotal.totalSpirits]
    ];
  }

  function beginOnslaught() {
    sendMessage(encodeMessage());
    setTimeout(beginOnslaught, config['data-wall'].channels.DrinkTotal);
  }

  beginOnslaught();
};
