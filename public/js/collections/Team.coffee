define [
  'MixPanel'
  'MixPanel/collections/mixins/Socket'
  'oraculum/models/mixins/auto-fetch'
], (MixPanelFactory) ->

  MixPanelFactory.extend 'Collection', 'Team.Collection', {
    url: '/teams'
    model: 'Model'
  }, {
    mixins: [
      'Socket.CollectionMixin'
      'AutoFetch.ModelMixin'
    ]
  }
