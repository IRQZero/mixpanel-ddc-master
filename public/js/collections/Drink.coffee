define [
  'MixPanel'
  'MixPanel/collections/mixins/Socket'
  'oraculum/models/mixins/auto-fetch'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Collection', 'Drink.Collection', {
    url: '/drinks'
    model: 'Model'
  }, {
    mixins: [
      'Socket.CollectionMixin'
      'AutoFetch.ModelMixin'
    ]
  }
