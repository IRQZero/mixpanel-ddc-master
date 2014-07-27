define [
  'MixPanel'
  'oraculum/application/controller'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Controller', 'Coat.Controller', {
    index: ->
      @reuse 'coat', 'Coat.View', {
        model: 'CoatMessage.Model'
        container: 'body'
      }
  }, {
    inheritMixins: true
  }
