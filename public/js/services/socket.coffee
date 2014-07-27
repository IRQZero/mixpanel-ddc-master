define [
  'MixPanel'
  'socket.io'
], (MixPanelFactory, io) ->

  MixPanelFactory.define 'Socket', ((namespace)-> io(namespace))
