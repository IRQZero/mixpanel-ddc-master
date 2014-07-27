define [
  'MixPanel'
  'MixPanel/collections/mixins/Socket'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Model', 'CoatMessage.Model', {
    url: '/coats'
    defaults:
      team: "None"
      Coat: 0
      Purse: 0
      Luggage: 0
    parse: ->
      false
    cancel: ->
      @set @defaults
    send: ->
      @save()
      @cancel()
  }, {
    mixins: [
      'Socket.CollectionMixin'
    ]
  }
