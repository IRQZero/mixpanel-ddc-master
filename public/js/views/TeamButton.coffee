define [
  'MixPanel'
  'MixPanel/views/SetButton'
  'MixPanel/views/mixins/BackgroundColor'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'SetButton.View', 'TeamButton.View', {
    initialize: ({@setModel, @setKey}) ->
       @mixinOptions.backgroundColor = @stringToColor[@model.get 'name']

    stringToColor:
       'Blue':      '#239AD2'
       'Green':     '#20BAA0'
       'Orange':    '#FFB25B'
       'Magenta':   '#FF00FF'
       'Purple':    '#554A9A'

  }, {
    inheritMixins: true
    mixins: [
       'BackgroundColor.ViewMixin'
    ]
  }
