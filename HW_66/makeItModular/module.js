'use strict';

const path = require('path'),
      fs = require('fs');

module.exports = function (dirName, extention, callback) {
    fs.readdir(dirName, (err, list) => {
        if (err) {
            return callback(err);
        } else {
            let acceptableExtentions = [];
            for (let i = 0; i < list.length; i++) {
                if (path.extname(list[i]) === '.' + extention) {
                    acceptableExtentions.push(list[i]);
                }
            }
            return callback(null, acceptableExtentions);
        }
    });
};