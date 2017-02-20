'use strict';

const mm = require('./module'),
      dir = process.argv[2],
      extention = process.argv[3];

mm(dir, extention, function (err, data) {
    if (err) {
        return console.log(err);
    }
    data.forEach(function (file) {
        console.log(file);
    });
});