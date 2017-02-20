'use strict';

const events = require('events'),
    eventEmitter = new events.EventEmitter();

eventEmitter.on('seconds', () => {
    console.log(new Date(new Date().getTime()).toLocaleTimeString());
});

function getTime() {
    eventEmitter.emit('seconds');
}

var counter = 0,
    interval = setInterval(function () {
        getTime();

        if(++counter === 10) {
            clearInterval(interval);
        }
}, 1000);