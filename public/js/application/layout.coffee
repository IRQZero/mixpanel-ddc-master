define [
  'MixPanel'
  'oraculum/views/mixins/layout'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'View', 'MixPanel.Layout', {
    el: 'body'
    events:
      'dblclick': ->
        return false;
  }, {
    mixins: [
      'Layout.ViewMixin'
    ]
  }
