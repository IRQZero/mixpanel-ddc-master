define [
  'MixPanel'
  'MixPanel/controllers/MixPanel'
  'MixPanel/controllers/Registration'
  'MixPanel/controllers/Bar'
  'MixPanel/controllers/Coat'
], (MixPanelFactory) ->

  MixPanelFactory.define 'routes', (->
    (match) ->
      match '', 'MixPanel.Controller#index'
      match 'register', 'Registration.Controller#index'
      match 'bar', 'Bar.Controller#index'
      match 'coat', 'Coat.Controller#index'
  ), {
    singleton: true
  }
