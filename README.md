Mixpanel Data Driven Conference - Master Control Server
-------------------------------------------------------

The master server will be able to server the following functions:

  * register nfc device readers to take information over socket io
  * take information from nfc devices and add to aggregate and store in couchdb
  * serve pages for registering device, bar tender messaging and coat check
  * handle messaging for bar tender and store + aggregate
  * handle mesasging for coat check and store + aggregate
  * send aggregate data to data-wall via osc

To run:

  `npm install`
  `./node_modules/.bin/bower install`
  `npm start`
