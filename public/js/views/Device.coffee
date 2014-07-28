define [
  'MixPanel'
  'oraculum/mixins/listener'
  'oraculum/mixins/disposable'
  'oraculum/views/mixins/remove-disposed'
  'oraculum/views/mixins/underscore-templating'
  'MixPanel/collections/Location'
  'oraculum/views/mixins/subview'
  'MixPanel/views/Selector'
  'oraculum/views/mixins/auto-render'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'View', 'Device.View', {
    events:
      'touchstart .send': 'send'
    mixinOptions:
      disposable:
        disposeAll: true
      template: """
      <div class="col-sm-4"><%- id %></div>
      <div class="col-sm-4 locations"></div>
      <div class="col-sm-4"><button class="btn btn-primary send">Send</button></div>
      """
      subviews:
        locations: ->
          view: 'Selector.View'
          viewOptions:
            valueKey: 'location'
            modelKey: 'name'
            container: @$ '.locations'
            model: @model
            collection: 'Location.Collection'
    send: ->
      @model.save()
  }, {
    mixins: [
      'Subview.ViewMixin'
      'Listener.Mixin'
      'Disposable.Mixin'
      'RemoveDisposed.ViewMixin'
      'Attach.ViewMixin'
      'UnderscoreTemplating.ViewMixin'
      'AutoRender.ViewMixin'
    ]
  }
