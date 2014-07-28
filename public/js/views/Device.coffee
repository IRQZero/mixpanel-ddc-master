define [
  'MixPanel'
  'oraculum/mixins/disposable'
  'oraculum/views/mixins/remove-disposed'
  'oraculum/views/mixins/underscore-templating'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'View', 'Device.View', {
    mixinOptions:
      template: """
      <div class="col-sm-4"><%- id %></div>
      <div class="col-sm-4 locations"></div>
      <div class="col-sm-4"><button class="btn btn-primary send">Send</button></div>
      """
  }, {
    mixins: [
      'Disposable.Mixin'
      'RemoveDisposed.ViewMixin'
      'UnderscoreTemplating.ViewMixin'
    ]
  }
