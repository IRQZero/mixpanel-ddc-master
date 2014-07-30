define [
  'MixPanel'
  'MixPanel/views/Report'
  'MixPanel/views/SetButton'
  'MixPanel/views/AddButton'
  'MixPanel/views/TeamButton'
  'MixPanel/collections/Team'
  'MixPanel/collections/Drink'
  'MixPanel/views/ButtonPanel'
  'oraculum/mixins/disposable'
  'MixPanel/views/ActionButton'
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
        <div class="team col-sm-5">
        </div>
        <div class="drink col-sm-5">
        </div>
        <div class="report col-sm-2">
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
            modelView: 'TeamButton.View'
            heightRatio: 0.75
            viewOptions:
              setModel: @model
              setKey: 'team'
            container: @$ '.team'
            model: @model
            collection: 'Team.Collection'
        drink: ->
          view: 'ButtonPanel.View'
          viewOptions:
            heightRatio: 0.75
            modelView: 'AddButton.View'
            viewOptions:
              setModel: @model
            container: @$ '.drink'
            model: @model
            collection: 'Drink.Collection'
        report: ->
          view: 'Report.View'
          viewOptions:
            heightRatio: 0.75
            container: @$ '.report'
            model: @model
            template: """
              <div>Team: <%- team %></div>
              <div>Drinks:
                <ul>
                  <li> Beer: <%- Beer %> </li>
                  <li> Wine: <%- Wine %> </li>
                  <li> Spirits: <%- Spirits %></li>
                </ul>
              </div>
            """

        send: ->
          view: 'ButtonPanel.View'
          viewOptions:
            modelView: 'ActionButton.View'
            viewOptions:
              actionModel: @model
            heightRatio: 0.50
            container: @$ '.send'
            collection: @__factory().get 'Collection', [{
              name: 'cancel'
            }, {
              name: 'send'
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
