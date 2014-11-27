# node-dadata
Tiny NPM module for the REST API of dadata.ru


## usage example
```javascript
var dadata = require('dadata')(process.env.DADATA_API_KEY, process.env.DADATA_SECRET_KEY);
dadata('address', ['мск сухонска 11/-89'], function (err, res) {
  console.log(err);
  console.log(res);
});
```


## formal docs

Before use, this service must be properly configured: you have to provide your `API_KEY` and `SECRET_KEY` to the constructor.
```javascript
  var DaData = require('dadata'),
      dadata_account_1 = new DaData('<API_KEY_1>', '<SECRET_KEY_1>'),
      dadata_account_2 = new DaData('<API_KEY_2>', '<SECRET_KEY_2>');
```

If you don't plan to utilize multiple instances of dadata service, it's also possible to use the short notation.
```javascript
  var dadata = require('dadata')('<YOUR_API_KEY>', '<YOUR_SECRET_KEY>');
```

Exposed `dadata` service is the function of 3 arguments (`function (apiType, queries, callback) {...}`), where:
  + api type -- one of `['address', 'birthdate', 'email', 'name', 'phone']`;
  + queries array -- array of one or more strings;
  + callback -- `function (error, result) {...}`; if everything's fine, then `error` is undefined and `result` contains a dadata response (an array of objects, corresponding to your array of queries); if something went wrong, `error` will contain an object with `code` and `message` fields, and `result` will be undefined.