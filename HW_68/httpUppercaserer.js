'use strict';

const http = require('http'),
      map = require('through2-map');

var server = http.createServer((request, response) => {
    response.setHeader('Content-type', 'text/plain');
    response.setHeader('X-Powered-By', 'PCS');
    request.pipe(map((data) => {
        return data.toString().toUpperCase();
    })).pipe(response);
}).listen(+process.argv[2]);