'use strict';

const fs = require('fs'),
      file = process.argv[2];

fs.readFile(file, 'utf-8', (err, data) => {
    if(err) {
        console.log(err);
    } else {
        console.log(data.split('\n').length-1);
    }
});