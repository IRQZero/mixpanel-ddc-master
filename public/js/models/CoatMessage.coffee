define [
  'MixPanel'
  'MixPanel/collections/mixins/Socket'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Model', 'CoatMessage.Model', {
    url: '/coats'
  }, {
    mixins: [
      'Socket.CollectionMixin'
    ]
  }
