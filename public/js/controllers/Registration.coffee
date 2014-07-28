define [
  'MixPanel'
  'MixPanel/views/Register'
  'MixPanel/collections/Device'
  'MixPanel/models/DeviceMessage'
  'oraculum/application/controller'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Controller', 'Registration.Controller', {
    index: ->
      @view = MixPanelFactory.get 'Register.View', {
        container: 'body'
        collection: 'Device.Collection'
        model: 'DeviceMessage.Model'
      }
  }, {
    inheritMixins: true
  }
