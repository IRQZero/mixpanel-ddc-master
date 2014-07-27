define [
  'MixPanel'
  'MixPanel/services/socket'
], (MixPanelFactory) ->

  $ = MixPanelFactory.get 'jQuery'

  MixPanelFactory.defineMixin 'Socket.CollectionMixin', {
    onSocketResult: (resp) ->
      return false unless @set @parse resp
      @trigger 'sync', this, resp

    onSocketWelcome: (resp) ->
      @messageReady.resolve()

    mixinitialize: ->
      _.bindAll this, 'onSocketResult', 'onSocketWelcome'
      @messageReady = $.Deferred()

      @socket = @__factory().get 'Socket', _.result this, 'url'

      @messageReady.done =>
        @socket.on 'read:result', @onSocketResult
        @socket.on 'create:result', @onSocketResult
        @socket.on 'update:result', @onSocketResult

      @socket.on 'welcome', @onSocketWelcome

    sync: (operation, object, options) ->
      if operation isnt 'read'
        data = object.toJSON()
      @messageReady.done =>
        @socket.emit operation, data

  }
