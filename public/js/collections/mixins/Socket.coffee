define [
  'MixPanel'
  'MixPanel/services/socket'
], (MixPanelFactory) ->

  $ = MixPanelFactory.get 'jQuery'

  openNames = {}

  MixPanelFactory.defineMixin 'Socket.CollectionMixin', {

    onSocketWelcome: (resp) ->
      @messageReady.resolve()

    mixinitialize: ->
      unless this.onSocketResult
        @onSocketResult =  (resp) ->
          return false unless @set @parse resp
          @trigger 'sync', this, resp
      _.bindAll this, 'onSocketResult', 'onSocketWelcome'
      namespace = _.result this, 'url'
      if openNames[namespace]?
        @messageReady = openNames[namespace]
      else
        @messageReady = openNames[namespace] = $.Deferred()

      @socket = @__factory().get 'Socket', namespace

      @messageReady.done =>
        @socket.on 'read:result', @onSocketResult

      @socket.on 'welcome', @onSocketWelcome

    sync: (operation, object, options) ->
      if operation isnt 'read'
        data = object.toJSON()
      @messageReady.done =>
        @socket.emit operation, data

  }
