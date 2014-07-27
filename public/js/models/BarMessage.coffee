define [
  'MixPanel'
  'oraculum/mixins/listener'
  'MixPanel/collections/mixins/Socket'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Model', 'BarMessage.Model', {
    mixinOptions:
      listen:
        "change this": "startTimer"
    url: '/drinks'
    defaults:
      team: "None"
      Beer: 0
      Wine: 0
      Spirits: 0
    startTimer: ->
      @started = (new Date()).getTime() unless @started?
    getTime: ->
      ended = (new Date()).getTime()
      @set time: ended - @started
    resetTimer: ->
      @started = null
    parse: ->
      false
    cancel: ->
      @set @defaults
      @resetTimer()
    send: ->
      @getTime()
      @save()
      @cancel()
  }, {
    mixins: [
      'Listener.Mixin'
      'Socket.CollectionMixin'
    ]
  }
