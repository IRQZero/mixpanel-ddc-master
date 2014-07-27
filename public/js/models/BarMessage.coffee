define [
  'MixPanel'
  'MixPanel/collections/mixins/Socket'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Model', 'BarMessage.Model', {
    url: '/bar'
  }, {
    mixins: [
      'Socket.CollectionMixin'
    ]
  }
