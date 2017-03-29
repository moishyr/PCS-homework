'use strict';

const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongo = require('mongodb'),
    app = express();

let posts,
    id;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.locals.title = 'MongoDB Socket.io Node Blog';

app.get('/', (req, res, next) => {
    posts.find().toArray((err, thePosts) => {
        if (err) {
            next(err);
        }
        res.render('layout', {
            //title: 'MongoDB Socket.io Node Blog',
            subtitle: 'Welcome to the blog',
            posts: thePosts,
            links: [{ url: '/newPost', text: 'new post' }, { url: 'https://www.google.com', text: 'google' }],
            comments: thePosts.comment,
            partials: {
                content: 'posts'
            }
        });
    });
});

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
    console.log('got new post', req.body.title, req.body.content);
    posts.insert({ title: req.body.title, content: req.body.content, date: new Date(), author: 'someone' }, (err, result) => {
        if (err) {
            next(err);
        }
        res.redirect('/');
    });
});

app.post('/', (req, res, next) => {
    console.log('got new comment', req.body.comment, req.body.author);
    id = new mongo.ObjectId(req.body.id);
    posts.update({ _id: id }, { $push: { comments: { author: req.body.author, comment: req.body.comment, date: new Date() } } }, (err, result) => {
        if (err) {
            next('oops you got an error ' + err);
        }
        res.redirect('/');
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

app.listen(80);