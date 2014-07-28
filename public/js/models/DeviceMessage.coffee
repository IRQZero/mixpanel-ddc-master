define [
  'MixPanel'
  'oraculum/mixins/disposable'
  'MixPanel/collections/mixins/Socket'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Model', 'DeviceMessage.Model', {
    url: '/devices'
    defaults:
      location: "None"
    onSocketResult: (resp) ->
  }, {
    mixins: [
      'Disposable.Mixin'
      'Socket.CollectionMixin'
    ]
  }
