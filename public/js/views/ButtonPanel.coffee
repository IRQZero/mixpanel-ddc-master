define [
  'MixPanel'
  'oraculum/views/mixins/list'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'View', 'ButtonPanel.View', {
    className: 'container-fluid'
    mixinOptions:
      modelView: 'Button.View'
  }, {
    mixins: [
      'List.ViewMixin'
    ]
  }
