define [
  'MixPanel'
], (MixPanelFactory) ->
  'use strict'

  MixPanelFactory.defineMixin 'BackgroundColor.ViewMixin', {
    mixinOptions:
      backgroundColor: "red"

    mixconfig: (mixinOptions, {color}) ->
      mixinOptions.backgroundColor = color if color?

    mixinitialize: ->
      @$el.css 'backgroundColor': @mixinOptions.backgroundColor

  }
