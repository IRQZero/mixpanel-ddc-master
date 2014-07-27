define [
  'MixPanel'
  'MixPanel/views/Button'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Button.View', 'AddButton.View', {
    events:
      click: 'addItem'
    addItem: ->
      @collection.add @model.toJSON()
  }, {
    inheritMixins: true
  }
