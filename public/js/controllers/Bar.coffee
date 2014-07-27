define [
  'MixPanel'
  'oraculum/application/controller'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Controller', 'Bar.Controller', {
    index: ->
      @reuse 'bar', 'Bar.View', {
        model: MixPanelFactory.get 'BarMessage.Model'
      }
  }, {
    inheritMixins: true
  }
