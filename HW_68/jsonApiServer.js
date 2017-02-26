'use strict';

const http = require('http'),
      url = require('url');

var server = http.createServer((request, response) => {
    response.setHeader('Content-type', 'application/json');
    response.setHeader('X-Powered-By', 'PCS');
    var requestUrl = url.parse(request.url, true),
        ISOFormat = '';
    if(requestUrl.query['iso']) {
        ISOFormat = requestUrl.query['iso'];
        var date = new Date(ISOFormat);
        
        switch(requestUrl.pathname) {
            case '/api/parsetime':
                console.log('in here');
                response.write(JSON.stringify({
                    hour: date.getHours(),
                    minute: date.getMinutes(),
                    second: date.getSeconds()
                }));
                break;
            case '/api/unixtime':
                response.write(JSON.stringify({unixtime: date.getTime()}));
                break;
        }
    }
    response.end();
}).listen(+process.argv[2]);