define [
  'MixPanel'
  'oraculum/application/controller'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Controller', 'Registration.Controller', {
    index: ->
  }, {
    inheritMixins: true
  }
