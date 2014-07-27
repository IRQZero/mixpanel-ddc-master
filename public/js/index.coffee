define [
  "Factory"
  "oraculum"
], (Factory, Oraculum) ->

  MixPanelFactory = new Factory -> Oraculum

  MixPanelFactory.mirror Oraculum

  window.MixPanelFactory = MixPanelFactory
