define [
  'MixPanel'
  'MixPanel/views/Button'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Button.View', 'ActionButton.View', {
    initialize: ({@actionModel}) ->
    events:
      touchstart: 'commitAction'
    commitAction: ->
      name = @model.get 'name'
      @actionModel[name]()
  }, {
    inheritMixins: true
  }
