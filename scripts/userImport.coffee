csv = require 'csv'
fs = require 'fs'
parse = csv.parse
io = require 'socket.io-client'
socket = io('http://localhost:8000/users')

keys = [
  "lastName"
  "firstName"
  "email"
  "ticketType"
  "jobTitle"
  "company"
  "id"
  "teamColor"
]

socket.on 'connect', ->
  done = 0;
  fs.readFile '../data/users.csv', 'utf-8', (err, content) ->
    parse content, {comment: '#'}, (err, data) ->
      data.map (values) =>
        user = keys.reduce((obj, key, idx) =>
          obj[key] = values[idx]
          obj
        , {})
        socket.emit('create', user)
        done++;
        console.log(done + ' records imported');
