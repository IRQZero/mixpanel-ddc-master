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
    className: 'row'
    events:
      'touchstart .send': 'send',
      'touchstart .stop': 'stop',
      'touchstart .start': 'start',
      'change .node>input': 'toggleNode',
      'change .plinth>input': 'togglePlinth'
    mixinOptions:
      listen:
        'change:plinth change:node model': 'render'
      disposable:
        disposeAll: true
      template: ->
        nChecked = if @model.get 'node' then 'checked' else ''
        pChecked = if @model.get 'plinth' then 'checked' else ''
        """
      <div class="col-sm-2"><%- id %></div>
      <div class="col-sm-2 locations"></div>
      <div class="col-sm-2 node">node: <input type="checkbox" #{nChecked}/></div>
      <div class="col-sm-2 plinth">plinth: <input type="checkbox" #{pChecked}/></div>
      <div class="col-sm-1"><button class="btn btn-primary send">Send</button></div>
      <div class="col-sm-1"><button class="btn btn-primary stop">Stop</button></div>
      <div class="col-sm-1"><button class="btn btn-primary start">Start</button></div>
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
    toggleNode: ->
      @model.set {node: (@$('.node input').is(':checked'))}, {silent: true}
    togglePlinth: ->
      @model.set {node: @$('.plinth input').is(':checked')}, {silent: true}
    stop: ->
      @model.sync 'stop', @model
    start: ->
      @model.sync 'start', @model
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
