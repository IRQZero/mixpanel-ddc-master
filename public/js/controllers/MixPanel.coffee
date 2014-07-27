define [
  'MixPanel'
  'oraculum/application/controller'
  'MixPanel/views/ButtonPanel'
  'MixPanel/collections/MainOptions'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Controller', 'MixPanel.Controller', {
    index: ->
      @reuse 'buttons', 'ButtonPanel.View', {
        collection: 'MainOptions.Collection'
        container: 'body'
      }
  }, {
    inheritMixins: true
  }
