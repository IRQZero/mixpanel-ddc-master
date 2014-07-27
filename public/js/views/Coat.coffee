define [
  'MixPanel'
  'MixPanel/views/Report'
  'MixPanel/views/SetButton'
  'MixPanel/views/AddButton'
  'MixPanel/collections/Coat'
  'MixPanel/collections/Team'
  'MixPanel/views/ButtonPanel'
  'oraculum/mixins/disposable'
  'oraculum/views/mixins/attach'
  'oraculum/views/mixins/subview'
  'oraculum/views/mixins/auto-render'
  'oraculum/views/mixins/html-templating'
  'oraculum/views/mixins/remove-disposed'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'View', 'Coat.View', {
    mixinOptions:
      template: """
      <div class="row-fluid">
        <div class="team col-sm-5">
        </div>
        <div class="coats col-sm-5">
        </div>
        <div class="report col-sm-2">
        </div>
      </div>
      <div class="row-fluid">
        <div class="send">
        </div>
      </div>
      """
      subviews:
        team: ->
          view: 'ButtonPanel.View'
          viewOptions:
            modelView: 'SetButton.View'
            heightRatio: 0.75
            viewOptions:
              setModel: @model
              setKey: 'team'
            container: @$ '.team'
            model: @model
            collection: 'Team.Collection'
        coats: ->
          view: 'ButtonPanel.View'
          viewOptions:
            heightRatio: 0.75
            modelView: 'AddButton.View'
            viewOptions:
              collection: @model.get 'coats'
            container: @$ '.coats'
            model: @model
            collection: 'Coat.Collection'
        report: ->
          view: "Report.View"
          viewOptions:
            heightRatio: 0.75
            container: @$ '.report'
            model: @model
            template: """
              <div>Team: <%- team %></div>
              <div>Drinks:
                <ul>
                  <li> Beer: <%- beer %> </li>
                  <li> Wine: <%- wine %> </li>
                  <li> Spirits: <%- spirits %></li>
                </ul>
              </div>
            """
        send: ->
          view: 'ButtonPanel.View'
          viewOptions:
            container: @$ '.send'
            heightRatio: 0.5
            collection: @__factory().get 'Collection', [{
              name: 'cancel'
            }, {
              name: 'send'
            }]
            model: @model
  }, {
    mixins: [
      'Disposable.Mixin'
      'RemoveDisposed.ViewMixin'
      'HTMLTemplating.ViewMixin'
      'Subview.ViewMixin'
      'Attach.ViewMixin'
      'AutoRender.ViewMixin'
    ]
  }
