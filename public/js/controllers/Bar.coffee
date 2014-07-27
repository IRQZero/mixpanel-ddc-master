define [
  'MixPanel'
  'oraculum/application/controller'
  'MixPanel/views/Bar'
  'MixPanel/models/BarMessage'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Controller', 'Bar.Controller', {
    index: ->
      @reuse 'bar', 'Bar.View', {
        container: 'body'
        model: MixPanelFactory.get 'BarMessage.Model'
      }
  }, {
    inheritMixins: true
  }
