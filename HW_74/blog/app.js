'use strict';

const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongo = require('mongodb'),
    socket_io = require('socket.io'),
    basicAuth = require('./basicAuth'),
    app = express();

let posts,
    io;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.locals.title = 'MongoDB Socket.io Node Blog';

app.get('/', (req, res, next) => {

    if (req.query.id) {
        posts.find({ _id: new mongo.ObjectId(req.query.id) }, {
            comments: 1
        }).toArray((err, thePosts) => {
            if (err) {
                next(err);
            }

            res.render('comments', { comments: thePosts[0].comments });
        });
    } else {
        posts.find({}, {
            _id: 1,
            title: 1,
            content: 1,
            date: 1,
            author: 1
        }).toArray((err, thePosts) => {
            if (err) {
                next(err);
            }

            res.render('posts', {
                posts: thePosts/*,
                partials: {
                    content: 'comments'
                }*/
            }, (err, html) => {
                res.render('layout', {
                    subtitle: 'Welcome to the blog',
                    links: [{ url: '/newPost', text: 'new post' }, { url: 'https://www.google.com', text: 'google' }],
                    scripts: ['/scripts/jquery-3.2.0.min.js', '/socket.io/socket.io.js', '/scripts/posts.js'],
                    posts: html,
                    partials: {
                        content: 'index'
                    }
                });
            });
        });
    }
});

app.use(basicAuth({
    realm: app.locals.title,
    accounts: {
        'Shloime Lubowsky': 'p@$$w0rd',
        Donald: 'Trump'
    }
}));

app.get('/newPost', (req, res) => {
    res.render('layout', {
        subtitle: 'Write a new blog post',
        links: [{ url: '/', text: 'home' }, { url: 'https://www.google.com', text: 'google' }],
        partials: {
            content: 'newPost'
        }
    });
});

app.post('/newPost', (req, res, next) => {
    posts.insert({ title: req.body.title, content: req.body.content, date: new Date(), author: req.user }, (err, result) => {
        if (err) {
            next(err);
        }
        res.redirect('/');
    });
});

app.post('/addComment', (req, res, next) => {
    const comment = {
        content: req.body.content,
        author: req.user,
        date: new Date()
    };

    posts.update({ _id: new mongo.ObjectId(req.body.id) }, {
        $push: {
            comments: comment
        }
    }, (err, result) => {
        if (err) {
            next(err);
        } else {
            res.render('comments', { comments: [comment] }, (err, html) => {
                io.sockets.emit('comment', { post: req.body.id, comment: html });
            });
        }
        res.end('added comment');
    });
});

app.use((err, req, res, next) => {
    res.status(500);
    res.end('OOPS. Server error: ' + err);
});

mongo.MongoClient.connect('mongodb://localhost:27017/blog2', (err, db) => {
    if (err) {
        console.error(err);
        return;
    }
    posts = db.collection('posts');
});

//socket_io.listen(http.createServer(app).listen(80));
io = socket_io.listen(app.listen(80));