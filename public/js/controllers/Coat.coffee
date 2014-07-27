define [
  'MixPanel'
  'oraculum/application/controller'
  'MixPanel/views/Coat'
  'MixPanel/models/CoatMessage'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Controller', 'Coat.Controller', {
    index: ->
      @reuse 'coat', 'Coat.View', {
        container: 'body'
        model: 'CoatMessage.Model'
      }
  }, {
    inheritMixins: true
  }
