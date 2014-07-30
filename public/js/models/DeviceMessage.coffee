define [
  'MixPanel'
  'oraculum/mixins/disposable'
  'MixPanel/collections/mixins/Socket'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Model', 'DeviceMessage.Model', {
    url: '/devices'
    defaults:
      location: "None"
      node: true
    onSocketResult: (resp) ->
    initialize: (attrs)->
      @set 'id', attrs._id
  }, {
    mixins: [
      'Disposable.Mixin'
      'Socket.CollectionMixin'
    ]
  }
