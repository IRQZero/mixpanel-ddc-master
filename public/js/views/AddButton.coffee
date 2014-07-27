define [
  'MixPanel'
  'MixPanel/views/Button'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Button.View', 'AddButton.View', {
    initialize: ({@setModel}) ->
    events:
      click: 'addItem'
    addItem: ->
      name = @model.get 'name'
      @setModel.set name, @setModel.get(name) + 1
  }, {
    inheritMixins: true
  }
