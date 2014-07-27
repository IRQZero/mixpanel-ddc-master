define [
  'MixPanel'
  'MixPanel/collections/mixins/Socket'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Model', 'BarMessage.Model', {
    url: '/drinks'
    defaults:
      team: "None"
      Beer: 0
      Wine: 0
      Spirits: 0
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
