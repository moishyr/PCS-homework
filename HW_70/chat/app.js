var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('layout', {
    title: 'Express',
    partials: { content: 'error' }
  });
});

// module.exports = app;

var server = http.createServer(app);
server.listen(80);

const socket_io = require('socket.io');
const io = socket_io.listen(server);

// Wait for connection
io.on('connection', socket => {
  console.log('Got a connection');
  socket.emit('message', 'Thanks for connecting!');

  // wait for 'message' events on this connection
  socket.on('message', data => {
    app.locals.user = data.user;

    io.sockets.emit('message', {
      name: app.locals.user,
      msg: data.msg
    });

  });

  socket.on('user', user => {
    app.locals.user = user;
    io.sockets.emit('message', app.locals.user + ' joined the chat');
  });

  socket.on('disconnect', msg => {
    io.sockets.emit('message', msg);
    // io.sockets.emit('disconnect', (app.locals.user + ' disconnected from the chat'));
  });
});

io.on('disconnect', socket => {
  socket.on('disconnect', msg => {
    io.sockets.emit('message', msg);
    // io.sockets.emit('disconnect', (app.locals.user + ' disconnected from the chat'));
  });
  
});
