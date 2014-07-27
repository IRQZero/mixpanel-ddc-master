define [
  'MixPanel'
  'socket.io'
], (MixPanelFactory, io) ->

  MixPanelFactory.define 'Socket', (->
    io()
  ), singleton: true
