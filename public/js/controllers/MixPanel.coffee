define [
  'MixPanel'
  'oraculum/application/controller'
  'MixPanel/views/ButtonPanel'
  'MixPanel/collections/MainOptions'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Controller', 'MixPanel.Controller', {
    index: ->
      @view = MixPanelFactory.get 'ButtonPanel.View', {
        container: 'body'
        collection: 'MainOptions.Collection'
      }
  }, {
    inheritMixins: true
  }
