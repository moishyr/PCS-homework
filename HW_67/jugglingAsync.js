'use strict';

const http = require('http');
let getRequestFinished = 0,
    responseInfo = [];

function print() {
    responseInfo.forEach(function(elem) {
        console.log(elem);
    });
}

function getRequest(url, arraySpot) {
    http.get(url, response => {
        response.setEncoding('utf-8');

        responseInfo[arraySpot] = '';
        response.on('data', data => {
            responseInfo[arraySpot] += data;
        });

        response.on('error', (err) => {
            console.error(err);
        });

        response.on('end', () =>{
            getRequestFinished++;
            if(getRequestFinished === 3) {
                print();
            }
        });

    });
}

getRequest(process.argv[2], 0);
getRequest(process.argv[3], 1);
getRequest(process.argv[4], 2);

// http.get(process.argv[2], response => {
//     response.setEncoding('utf-8');

//     response.on('data', data => {
//         responseInfo[0] += data;
//     });

//     response.on('error', (err) => {
//         console.error(err);
//     });

//     response.on('end', () =>{
//         getRequestFinished++;
//         if(getRequestFinished === 3) {
//             print();
//         }
//     });

// });


// http.get(process.argv[3], response => {
//     response.setEncoding('utf-8');

//     response.on('data', data => {
//         responseInfo[1] += data;
//     });

//     response.on('error', (err) => {
//         console.error(err);
//     });

//     response.on('end', () =>{
//         getRequestFinished++;
//         if(getRequestFinished === 3) {
//             print();
//         }
//     });

// });


// http.get(process.argv[4], response => {
//     response.setEncoding('utf-8');

//     response.on('data', data => {
//         responseInfo[2] += data;
//     });

//     response.on('error', (err) => {
//         console.error(err);
//     });

//     response.on('end', () =>{
//         getRequestFinished++;
//         if(getRequestFinished === 3) {
//             print();
//         }
//     });

// });