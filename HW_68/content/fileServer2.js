'use strict';

const http = require('http'),
    fs = require('fs'),
    path = require('path'),
    contentType = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript'
    };
let cache = {};

var server = http.createServer((request, response) => {
    console.log('serving', request.url);

    const ext = path.extname(request.url);
    if (ext && contentType[ext]) {
        response.setHeader('Content-type', contentType[ext]);
    }
    response.setHeader('X-Powered-By', 'PCS');

    if (cache[request.url]) {
        console.log('Serving from cache');
        cache[request.url].accessed = new Date();
        response.end(cache[request.url].data);
    } else {
        console.log('Serving from disk');
        fs.readFile('content/' + request.url, 'utf-8', (err, data) => {
            if (err) {
                response.setHeader('Content-type', contentType['.html']);
                if (err.code === 'ENOENT') {
                    response.statusCode = 404;
                    response.write('No such page. Sorry.<br><h1>404</h1>');
                } else {
                    response.statusCode = 500;
                }
                response.end(err.message);
                return;
            }
            cache[request.url] = {
                accessed: new Date(),
                data: data,
                loaded: new Date()
            };
            response.end(data);
        });
    }
}).listen(80);

setInterval(() => {
    const cutOff = new Date() - 5000;
    /*for (var key in cache) {
        if (cache.hasOwnProperty(key)) {
            if (cache[key].accessed < cutOff) {
                delete cache[key];
            }
        }
    }*/
    Object.keys(cache).forEach(key => {
        if (cache[key].accessed < cutOff) {
            delete cache[key];
        }

        // also check if modified on disk after "loaded", remove it
    });

}, 5000);

/*
var foo = {
    foo: 25
};

var bar = Object.create(foo);
bar.bar = 50;

for (var key in bar) {
    if (bar.hasOwnProperty(key)) {
        console.log(key, bar[key]);
    }
}
*/

