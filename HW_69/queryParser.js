'use strict';

const url = require('url'),
      fs = require('fs');

module.exports = (req, res, next) => {
    req.pathname = url.parse(req.url, true).pathname;
    if(req.pathname !== '/') {
        fs.readFile('.' + req.pathname, 'utf-8', (err, data) =>{
            if(err) {
                next('error. no page found');
                // console.error('you can read this');
                return;
            }
            res.end(data);
        });
    } else {
        res.end();
    }
};