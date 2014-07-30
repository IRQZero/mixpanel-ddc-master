define [
  'MixPanel'
  'MixPanel/views/SetButton'
  'MixPanel/views/mixins/BackgroundColor'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'SetButton.View', 'TeamButton.View', {
    initialize: ->
       @mixinOptions.backgroundColor = @stringToColor[@model.get 'name']

    stringToColor: 
       'Blue':      'rgb(18, 75, 116)'
       'Green':     'rgb(26, 111, 45)'
       'Orange':    'rgb(128, 63, 21)'
       'Magenta':   'rgb(128, 0, 89)'
       'Purple':    'rgb(61, 38, 79)'
    
  }, {
    inheritMixins: true
    mixins: [
       'BackgroundColor.ViewMixin' 
    ]
  }

