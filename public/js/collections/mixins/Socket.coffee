define [
  'MixPanel'
  'MixPanel/services/socket'
], (MixPanelFactory) ->

  MixPanelFactory.defineMixin 'Socket.CollectionMixin', {
    mixinitialize: ->
      @socket = @__factory().get 'Socket'
    sync: (operation, object, options) ->
      if operation isnt 'read'
        data = object.toJSON()
      debugger
      @socket.emit operation, data

  }
