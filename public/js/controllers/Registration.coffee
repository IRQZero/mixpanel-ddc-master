define [
  'MixPanel'
  'MixPanel/views/Register'
  'MixPanel/collections/Device'
  'MixPanel/models/DeviceMessage'
  'oraculum/application/controller'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Controller', 'Registration.Controller', {
    index: ->
      @reuse 'devices', 'Register.View', {
        container: 'body'
        collection: 'Device.Collection'
      }
  }, {
    inheritMixins: true
  }
