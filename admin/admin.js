const express = require('express');
var bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'pug');
app.set('views', 'admin/views');
var adminLogin = false;
var route = {},
    admin_route;
app.use('/res', express.static('admin/res'));
app.use(fileUpload());

fs.readFile('./admin/admin_route.json', function(err, data) {
    if (err) {
        console.log(err);
    }
    // console.log(JSON.parse(data));
    route = JSON.parse(data);
});

app.get('/', function(req, res) {
    console.log('Get Request ' + adminLogin);
    if (!adminLogin) {
        res.sendFile('login.html', {
            root: 'admin'
        });
    } else {
        res.sendFile('index.html', {
            root: 'admin'
        });
    }
});

app.get('/logout', function(req, res) {
    if (adminLogin) {
        res.sendFile('login.html', {
            root: 'admin'
        });
        adminLogin = false;
    } else {
        res.sendFile('login.html', {
            root: 'admin'
        });
        adminLogin = false;
    }
})

app.post('/', function(req, res) {
    console.log('Post Request ' + adminLogin);
    console.log(req.body.pwd.toString());
    if (req.body.pwd.toString() === '9548' && !adminLogin) {
        res.sendFile('index.html', {
            root: 'admin'
        });
        adminLogin = true;
        console.log(adminLogin);
    }
    // next();
});

app.get('/create', function(req, res) {
    res.render('menu', {
        pages: route.pages.create.children,
        selected: 'create'
    });
});

app.get('/read', function(req, res) {
    res.render('menu', {
        pages: route.pages.read.children,
        selected: 'read'
    });
});

app.get('/update', function(req, res) {
    res.render('menu', {
        pages: route.pages.update.children,
        selected: 'update'
    });
});

app.get('/delete', function(req, res) {
    res.render('menu', {
        pages: route.pages.delete.children,
        selected: 'delete'
    });
});

app.get('/create/upload', function(req, res) {
    res.render('upload', {
        value: 'Text ? Media - File Upload.'
    });
})

app.post('/create/upload', function(req, res) {
    if (!req.files)
        return res.status(400).send('No files were uploaded.');

    let file = req.files.File;
    console.log(file);
    let add = address('F:/github/adi/assests/', file.name, file.mimetype);

    let assest = {};
    assest.name = file.name;
    assest.type = file.mimetype;
    assest.address = add;

    // Using the mv() method to place the file somewhere on your server
    file.mv(add, function(err) {
        if (err)
            return res.status(500).send(err);
        else {
            // console.log(asset);
            setTimeout(() => {
                fs.readdir('./assests/', update);
        }, '500');
            setTimeout(() => {
                fs.readdir('./posts/', check);
        }, '500');
        }
        res.redirect('/admin/create/upload');
    });
})


module.exports = app;