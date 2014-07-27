define [
  'MixPanel'
  'oraculum/views/mixins/layout'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'View', 'MixPanel.Layout', {
    el: 'body'
  }, {
    mixins: [
      'Layout.ViewMixin'
    ]
  }
