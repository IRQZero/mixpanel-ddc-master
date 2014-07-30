define [
  'MixPanel'
  'MixPanel/views/Button'
  'oraculum/mixins/listener'
  'oraculum/views/mixins/list'
  'oraculum/views/mixins/attach'
  'oraculum/views/mixins/auto-render'
  'oraculum/views/mixins/remove-disposed'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'View', 'ButtonPanel.View', {
    className: 'team'
    mixinOptions:
      list:
        modelView: 'Button.View'
      listen:
        'visibilityChange this': 'organizeChildren'
    initialize: ({@heightRatio, @widthRatio} = {}) ->
    organizeChildren: ->
      l = Math.sqrt @collection.length
      w = 100 / Math.ceil l # width required for a square
      hr = if (@collection.length % w) is 0 then 1 else 0
      h = 100 / (Math.ceil(l) + hr)
      @_subviews.map (view) =>
        view.$el.css {
          height: "#{h * (@heightRatio or 1)}%"
          width: "#{w * (@widthRatio or 1)}%"
        }
  }, {
    mixins: [
      'Disposable.Mixin'
      'RemoveDisposed.ViewMixin'
      'Listener.Mixin'
      'Attach.ViewMixin'
      'List.ViewMixin'
      'AutoRender.ViewMixin'
    ]
  }

