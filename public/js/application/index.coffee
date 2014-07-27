define [
  'MixPanel'
  'oraculum/application/index'
  'MixPanel/application/layout'
  'MixPanel/application/routes'
], (MixPanelFactory) ->
  
  MixPanelFactory.get 'Application', {
    layout: 'MixPanel.Layout'
    routes: MixPanelFactory.get 'routes'
  }
