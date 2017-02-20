'use strict';

const fs = require('fs'),
      path = require('path'),
      dir = process.argv[2],
      extention = '.' + process.argv[3];

fs.readdir(dir, (err, list) => {
    if(err) {
        console.log(err);
    } else {
        for(let i = 0; i < list.length; i++) {
            if(path.extname(list[i]) === extention) {
                console.log(list[i]);
            }
        }
    }
});