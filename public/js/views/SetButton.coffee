define [
  'MixPanel'
  'MixPanel/views/Button'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Button.View', 'SetButton.View', {
    initialize: ({@setModel, @setKey}) ->
    events:
      touchstart: 'setValue'
    setValue: ->
      @setModel.set @setKey, @model.get 'name'
  }, {
    inheritMixins: true
  }
