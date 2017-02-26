'use strict';

const http = require('http'),
      fs = require('fs');

var server = http.createServer((request, response) => {
    response.setHeader('Content-type', 'text/plain');
    response.setHeader('X-Powered-By', 'PCS');
    var readStream = fs.createReadStream(process.argv[3], 'utf-8');
    readStream.pipe(response);
}).listen(+process.argv[2]);