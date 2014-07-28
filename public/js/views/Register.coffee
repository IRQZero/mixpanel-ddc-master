define [
  'MixPanel'
  'MixPanel/views/Device'
  'oraculum/mixins/disposable'
  'oraculum/views/mixins/attach'
  'oraculum/views/mixins/auto-render'
  'oraculum/views/mixins/remove-disposed'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'View', 'Register.View', {
    mixinOptions:
      list:
        modelView: 'Device.View'
  }, {
    mixins: [
      'Disposable.Mixin'
      'RemoveDisposed.ViewMixin'
      'Attach.ViewMixin'
      'List.ViewMixin'
      'AutoRender.ViewMixin'
    ]
  }
