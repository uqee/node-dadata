'use strict';
var https = require('https'),
    apiUrl = '/api/v2/clean/',
    apiTypes = ['address', 'birthdate', 'email', 'name', 'phone'];

// request sender
function reqSend (apiType, queries, callback) {
  /* jshint validthis:true */
  var req;
  
  // handle invalid apiType
  if (apiTypes.indexOf(apiType) === -1)
    return callback({
      code: -2,
      message: 'node-dadata: invalid apiType'
    });

  // ok
  else {

    // set api endpoint
    this.reqOptions.path = apiUrl + apiType;

    // create request
    req = https.request(this.reqOptions, function (res) {
      var body = '';

      // handle http error
      if (res.statusCode !== 200)
        return callback({
          code: res.statusCode,
          message: 'HTTP ERROR: bad status code'
        });

      // ok
      else {
        res.on('data', function (chunk) { body += chunk; });
        res.on('end', function () { callback(null, JSON.parse(body)); });
      }
    });

    // handle request error
    req.on('error', function (err) {
      callback({
        code: -1,
        message: 'REQUEST ERROR: ' + err.message
      });
    });

    // send request body
    // utf8 is by default
    req.write(JSON.stringify(queries));
    req.end();
  }
}

// service constructor
function DaData (API_KEY, SECRET_KEY) {

  // fail if no keys provided
  if (!API_KEY || !SECRET_KEY) {
    console.log('node-dadata: keys are strongly required');
    return null;
  }

  // don't fail if someone have forgotten about new
  else if (!(this instanceof DaData))
    return new DaData(API_KEY, SECRET_KEY);

  // ok
  else {

    // set request options
    this.reqOptions = {
      method: 'POST',
      hostname: 'dadata.ru',
      port: 443,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + API_KEY,
        'X-Secret': SECRET_KEY
      }
    };

    // return request sender
    return reqSend.bind(this);
  }
}

// exports
module.exports = DaData;
