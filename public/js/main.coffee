requirejs.config
  baseUrl: '/'
  paths:
    backbone: 'components/backbone/backbone'
    underscore: 'components/underscore/underscore'
    jquery: 'components/jquery/dist/jquery'
    'simply-deferred': 'components/simply-deferred/deferred'
    Factory: "components/factoryjs/dist/Factory"
    BackboneFactory: "components/factoryjs/dist/BackboneFactory"
    "socket.io": "/socket.io/socket.io"
  packages: [
    {
      name: "MixPanel",
      location: "js",
      main: "index"
    },{
      name: "oraculum",
      location: "components/oraculum/src"
    }
  ],
  deps: [
    'MixPanel/application/index'
  ]
