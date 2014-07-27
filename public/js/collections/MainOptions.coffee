define [
  'MixPanel'
  'MixPanel/collections/mixins/Socket'
  'oraculum/models/mixins/auto-fetch'
  'oraculum/models/mixins/disposable'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Collection', 'MainOptions.Collection', {
    url: '/routes'
    model: 'Model'
  }, {
    mixins: [
      'Disposable.CollectionMixin'
      'Socket.CollectionMixin'
      'AutoFetch.ModelMixin'
    ]
  }
