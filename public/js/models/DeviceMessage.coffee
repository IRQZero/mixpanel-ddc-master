define [
  'MixPanel'
  'oraculum/mixins/listener'
  'MixPanel/collections/mixins/Socket'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Model', 'DeviceMessage.Model', {
    url: '/devices'
    defaults:
      location: "None"
  }, {
    mixins: [
      'Socket.CollectionMixin'
    ]
  }
