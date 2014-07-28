define [
  'MixPanel'
  'MixPanel/views/Option'
  'oraculum/mixins/disposable'
  'oraculum/views/mixins/remove-disposed'
  'oraculum/views/mixins/list'
  'oraculum/views/mixins/attach'
  'oraculum/views/mixins/auto-render'
  'oraculum/mixins/listener'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'View', 'Selector.View', {
    initialize: ({@valueKey, @modelKey}) ->
      @updateView = _.debounce(@updateView.bind(this), 2000)
    tagName: 'select'
    events:
      change: 'updateSelection'
    mixinOptions:
      listen:
        'visibilityChange this': 'updateView'
        'dispose:before this': 'stopListening'
      list:
        modelView: 'Option.View'
        viewOptions: ({model})->
          valueKey: @modelKey
          model: model
    updateView: ->
      return if @disposed
      @$el.val(@model.get @valueKey)
    updateSelection: (event) ->
      @model.set @valueKey, @$el.val()

  }, {
    mixins: [
      'Disposable.Mixin'
      'Listener.Mixin'
      'RemoveDisposed.ViewMixin'
      'Attach.ViewMixin'
      'List.ViewMixin'
      'AutoRender.ViewMixin'
    ]
  }
