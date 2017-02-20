'use strict';

const fs = require('fs'),
      file = process.argv[2];

var fileContents = fs.readFileSync(file, 'utf-8');

console.log(fileContents.split('\n').length-1);