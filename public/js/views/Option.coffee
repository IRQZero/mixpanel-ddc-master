define [
  'MixPanel'
  'oraculum/mixins/listener'
  'oraculum/mixins/disposable'
  'oraculum/views/mixins/remove-disposed'
  'oraculum/views/mixins/underscore-templating'
  'oraculum/views/mixins/attach'
  'oraculum/views/mixins/auto-render'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'View', 'Option.View', {
    tagName: 'option'
    initialize: ({@valueKey}) ->
      @$el.prop 'value', @model.get @valueKey
    mixinOptions:
      listen:
        'all model': 'render'
      template: ->
        "#{@model.get @valueKey}"
  }, {
    mixins: [
      'Listener.Mixin'
      'Disposable.Mixin'
      'RemoveDisposed.ViewMixin'
      'UnderscoreTemplating.ViewMixin'
      'AutoRender.ViewMixin'
    ]
  }
