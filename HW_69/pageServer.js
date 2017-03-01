'use strict';

const express = require('express'),
      app = express(),
      qp = require('./queryParser'),
      fs = require('fs');

app.use('/', (req, res, next) => {
    res.setHeader('Content-type', 'text/html');
    fs.readFile('./index.html', 'utf-8', (err, data) =>{
        if(err) {
            next('you did not get the index page');
            return;
        }
        res.write(data);
        next();
    });
});

app.use(qp);

app.use((err, req, res, next) => {
    res.end(err);
});

app.listen(80);