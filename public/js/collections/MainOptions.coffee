define [
  'MixPanel'
  'MixPanel/collections/mixins/Socket'
  'oraculum/models/mixins/auto-fetch'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Collection', 'MainOptions.Collection', {
    url: 'routes'
    model: 'Model'
  }, {
    mixins: [
      'Socket.CollectionMixin'
      'AutoFetch.ModelMixin'
    ]
  }
