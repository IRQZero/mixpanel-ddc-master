define [
  'MixPanel'
  'MixPanel/views/Report'
  'MixPanel/views/SetButton'
  'MixPanel/views/AddButton'
  'MixPanel/collections/Team'
  'MixPanel/collections/Drink'
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
        <div class="team col-sm-4">
        </div>
        <div class="drink col-sm-5">
        </div>
        <div class="report col-sm-3">
        </div>
      </div>
      <div class="row-fluid">
        <div class="send col-sm-12">
        </div>
      </div>
      """
      subviews:
        team: ->
          view: 'ButtonPanel.View'
          viewOptions:
            modelView: 'SetButton.View'
            viewOptions:
              setModel: @model
              setKey: 'team'
            container: @$ '.team'
            model: @model
            collection: 'Team.Collection'
        drink: ->
          view: 'ButtonPanel.View'
          viewOptions:
            modelView: 'AddButton.View'
            viewOptions: ({model}) ->
              collection: @model.get 'drinks'
              model: model
            container: @$ '.drink'
            model: @model
            collection: 'Drink.Collection'
        report: ->
          view: 'Report.View'
          viewOptions:
            container: @$ '.report'
            model: @model
        send: ->
          view: 'ButtonPanel.View'
          viewOptions:
            container: @$ '.send'
            collection: @__factory().get 'Collection', [{
              name: 'send'
            }, {
              name: 'cancel'
            }]
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
