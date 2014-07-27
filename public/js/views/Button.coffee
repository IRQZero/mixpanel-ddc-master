define [
  'MixPanel'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'View', 'Button.View', {
    tagName: 'button'
    className: 'btn btn-primary btn-large'
  }
