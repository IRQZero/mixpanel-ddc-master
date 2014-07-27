define [
  'MixPanel'
  'oraculum/mixins/callback-provider'
  'oraculum/views/mixins/underscore-templating'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'View', 'Button.View', {
    events:
      'click': ->
        @executeCallback 'router:route', {url: @model.get 'name'}
    tagName: 'button'
    className: 'btn btn-primary btn-large'
    mixinOptions:
      template: "<%- name %>"
  }, {
    mixins: [
      'CallbackDelegate.Mixin'
      'UnderscoreTemplating.ViewMixin'
    ]
  }
