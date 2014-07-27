define [
  'MixPanel'
  'oraculum/application/controller'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Controller', 'Coat.Controller', {
    index: ->
  }, {
    inheritMixins: true
  }
