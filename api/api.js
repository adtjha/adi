const express = require('express');
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/res', express.static('api'));

app.get('/admin/style.css', function(req, res) {
    res.sendFile('style.css', {
        root: 'api/admin_res'
    });
})

app.get('/admin/app.js', function(req, res) {
    res.sendFile('app.js', {
        root: 'api/admin_res'
    });
})

app.get('/admin/upload.js', function(req, res) {
    res.sendFile('upload.js', {
        root: 'api/admin_res'
    });
})

// Public Resources API

app.get('/public/style.css', function(req, res) {
    res.sendFile('style.css', {
        root: 'api/public_res'
    });
})

app.get('/public/md.css', function(req, res) {
    res.sendFile('md.css', {
        root: 'api/public_res'
    });
})

app.get('/public/app.js', function(req, res) {
    res.sendFile('app.js', {
        root: 'api/admin_res'
    });
})

app.get('/public/face.jpg', function(req, res) {
    res.sendFile('face.jpg', {
        root: 'api/public_res'
    });
})

app.get('/public/posts.json', function(req, res) {
    res.sendFile('posts.json', {
        root: 'registry'
    });
})


module.exports = app;