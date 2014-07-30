define [
  "Factory"
  "oraculum"
  "oraculum/libs"
], (Factory, Oraculum) ->

  _ = Oraculum.get 'underscore'

  MixPanelFactory = new Factory -> Oraculum

  MixPanelFactory.mirror Oraculum

  isTouchDevice = ->
    window.ontouchstart?

  MixPanelFactory.onTag 'Button.View', (view) ->
    return if isTouchDevice()
    return unless view.events?
    changed = false
    Object.keys(view.events).forEach (eventSig) ->
      if eventSig.indexOf 'touchstart' is 0
        view.events = _.clone view.events
        view.events[eventSig.replace /^touchstart/, 'click'] = view.events[eventSig]
        delete view.events[eventSig]
        changed = true
    view.delegateEvents(view.events) if changed

  window.MixPanelFactory = MixPanelFactory
