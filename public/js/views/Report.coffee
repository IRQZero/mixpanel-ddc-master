define [
  'MixPanel'
  'oraculum/mixins/listener'
  'oraculum/mixins/disposable'
  'oraculum/views/mixins/attach'
  'oraculum/views/mixins/auto-render'
  'oraculum/views/mixins/remove-disposed'
  'oraculum/views/mixins/underscore-templating'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'View', 'Report.View', {
    className: 'report'
    mixinOptions:
      listen:
        'change model': 'render'
  }, {
    mixins: [
      'Disposable.Mixin'
      'RemoveDisposed.ViewMixin'
      'Listener.Mixin'
      'UnderscoreTemplating.ViewMixin'
      'Attach.ViewMixin'
      'AutoRender.ViewMixin'
    ]
  }
