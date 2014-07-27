define [
  'MixPanel'
  'oraculum/application/index'
  'oraculum/application/router'
  'MixPanel/application/layout'
  'MixPanel/application/routes'
], (MixPanelFactory) ->

  MixPanelFactory.get 'Application', {
    router: 'Router'
    layout: 'MixPanel.Layout'
    routes: MixPanelFactory.get 'routes'
  }
