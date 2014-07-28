define [
  'MixPanel'
  'MixPanel/collections/mixins/Socket'
  'oraculum/models/mixins/auto-fetch'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Collection', 'Device.Collection', {
    url: '/devices'
    model: 'Model'
  }, {
    mixins: [
      'Socket.CollectionMixin'
      'AutoFetch.ModelMixin'
    ]
  }
