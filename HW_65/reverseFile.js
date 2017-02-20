'use strict';

const fs = require('fs');

function reverseString(string) {
    var newString = '';
    for(var i = 1; i <= string.length; i++) {
        newString += string[string.length-i];
    }
    return newString;
}

function recursiveReverseString(originalString, newString) {
    newString = newString || '';

    if(originalString.length === 0) {
        return newString;
    }

    newString += originalString[originalString.length-1];
    originalString = originalString.substring(0, originalString.length-1);
    
    return recursiveReverseString(originalString, newString);
}

fs.readFile('reverseFile.js', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        console.log('File Contents:\n', recursiveReverseString(data.toString()));
    }
});