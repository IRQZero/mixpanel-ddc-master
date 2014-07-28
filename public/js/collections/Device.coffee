define [
  'MixPanel'
  'MixPanel/models/DeviceMessage'
  'oraculum/mixins/disposable'
  'oraculum/models/mixins/disposable'
  'MixPanel/collections/mixins/Socket'
  'oraculum/models/mixins/auto-fetch'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Collection', 'Device.Collection', {
    url: '/devices'
    model: 'DeviceMessage.Model'
    parse: (resp) ->
      resp
  }, {
    mixins: [
      'Disposable.Mixin'
      'Disposable.CollectionMixin'
      'Socket.CollectionMixin'
      'AutoFetch.ModelMixin'
    ]
  }
