'use strict';

const net = require('net'),
    strftime = require('strftime'),
    server = net.createServer(function (socket) {
        socket.end(strftime('%F %k:%M', new Date()) + '\n');
    }).listen(+process.argv[2]);