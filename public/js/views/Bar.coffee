define [
  'MixPanel'
  'MixPanel/views/ButtonPanel'
  'oraculum/mixins/disposable'
  'oraculum/views/mixins/attach'
  'oraculum/views/mixins/subview'
  'oraculum/views/mixins/auto-render'
  'oraculum/views/mixins/html-templating'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'View', 'Bar.View', {
    className: "row-fluid"
    mixinOptions:
      template: """
      <div class="row-fluid">
        <div class="team col-sm-3">
        </div>
        <div class="drink col-sm-3">
        </div>
      </div>
      <div class="row-fluid">
        <div class="send col-sm-12">
        </div>
      </div>
      """
      subviews:
        team:
          view: 'ButtonPanel.View'
          viewOptions: ->
            container: @$ '.team'
            model: @model
            collection: 'Team.Collection'
        drink:
          view: 'ButtonPanel.View'
          viewOptions: ->
            container: @$ '.drink'
            model: @model
            collection: 'Drink.Collection'
        send:
          view: 'Button.View'
          viewOptions: ->
            container: @$ '.send'
            model: @model
  }, {
    mixins: [
      'Disposable.Mixin'
      'HTMLTemplating.ViewMixin'
      'Subview.ViewMixin'
      'Attach.ViewMixin'
      'AutoRender.ViewMixin'
    ]
  }
