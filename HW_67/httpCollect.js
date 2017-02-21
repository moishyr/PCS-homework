'use strict';

const http = require('http');

http.get(process.argv[2], response => {
    response.setEncoding('utf-8');

    let responseInfo = '';
    response.on('data', data => {
        responseInfo += data;
    });

    response.on('error', (err) => {
        console.error(err);
    });

    response.on('end', () =>{
        console.log(responseInfo.length);
        console.log(responseInfo);
    });

});