define [
  'MixPanel'
  'oraculum/views/mixins/underscore-templating'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'View', 'Report.View', {

  }, {
    mixins: [
      'UnderscoreTemplating.ViewMixin'
    ]
  }
