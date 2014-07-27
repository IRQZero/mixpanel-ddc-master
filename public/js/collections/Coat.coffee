define [
  'MixPanel'
  'MixPanel/collections/mixins/Socket'
  'oraculum/models/mixins/auto-fetch'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Collection', 'Coat.Collection', {
    url: '/coats'
    model: 'Model'
  }, {
    mixins: [
      'Socket.CollectionMixin'
      'AutoFetch.ModelMixin'
    ]
  }
