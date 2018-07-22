const express = require('express');
var bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const fs = require('fs');

const app = express();

app.listen('6969', function() {
  console.log("ready to serve on 6969...");
});

app.get('/', function(req, res) {
  res.sendFile('index.html', {
    root: 'public'
  })
})
//      / \
// ****/  \\*********||   \\******************  ******
// ***/    \\********||    \\*********************  ***
// **/ *****\\*******||     ||***********************  *
// */  ******\\******||    //*********************  ***
// /          \\*****||   //******************  *****
// Admin Settings.

var admin = express();
admin.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/admin', admin);
admin.set('view engine', 'pug');
admin.set('views', 'admin/views');
admin.login = false;
var route = {},
  admin_route;
admin.use('/res', express.static('admin/res'));
admin.use(fileUpload());
fs.readFile('./admin/admin_route.json', function(err, data) {
  if (err) {
    console.log(err);
  }
  // console.log(JSON.parse(data));
  route = JSON.parse(data);
});

// Admin Routing.

admin.get('/', function(req, res) {
  console.log('Get Request ' + admin.login);
  if (!admin.login) {
    res.sendFile('login.html', {
      root: 'admin'
    });
  } else {
    res.sendFile('index.html', {
      root: 'admin'
    });
  }
});

admin.get('/logout', function(req, res) {
  if (admin.login) {
    res.sendFile('login.html', {
      root: 'admin'
    });
    admin.login = false;
  } else {
    res.sendFile('login.html', {
      root: 'admin'
    });
    admin.login = false;
  }
})

admin.post('/', function(req, res) {
  console.log('Post Request ' + admin.login);
  console.log(req.body.pwd.toString());
  if (req.body.pwd.toString() === '9548' && !admin.login) {
    res.sendFile('index.html', {
      root: 'admin'
    });
    admin.login = true;
    console.log(admin.login);
  }
  // next();
});

admin.get('/create', function(req, res) {
  res.render('menu', {
    pages: route.pages.create.children,
    selected: 'create'
  });
});



admin.get('/read', function(req, res) {
  res.render('menu', {
    pages: route.pages.read.children,
    selected: 'read'
  });
});

admin.get('/update', function(req, res) {
  res.render('menu', {
    pages: route.pages.update.children,
    selected: 'update'
  });
});

admin.get('/delete', function(req, res) {
  res.render('menu', {
    pages: route.pages.delete.children,
    selected: 'delete'
  });
});

admin.get('/create/upload', function(req, res) {
  res.render('upload', {
    value: 'Text ? Media - File Upload.'
  });
})

admin.post('/create/upload', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  let file = req.files.File;
  let add = address('F:/calc/adi/assests/', file.name, file.mimetype);

  let assest = {};
  assest.name = file.name;
  assest.type = file.mimetype;
  assest.address = add;

  // Using the mv() method to place the file somewhere on your server
  file.mv(add, function(err) {
    if (err)
      return res.status(500).send(err);
    else {
      // console.log(assest);
    }
    res.redirect('/admin/create/upload');
  });
})

// API Routing.

var api = express();
api.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/api', api);
api.use('/res', express.static('api'));

api.get('/admin/style.css', function(req, res) {
  res.sendFile('style.css', {
    root: 'api/admin_res'
  });
})

api.get('/admin/app.js', function(req, res) {
  res.sendFile('app.js', {
    root: 'api/admin_res'
  });
})

api.get('/admin/upload.js', function(req, res) {
  res.sendFile('upload.js', {
    root: 'api/admin_res'
  });
})

// Public Resources API

api.get('/public/style.css', function(req, res) {
  res.sendFile('style.css', {
    root: 'api/public_res'
  });
})

api.get('/public/app.js', function(req, res) {
  res.sendFile('app.js', {
    root: 'api/admin_res'
  });
})

api.get('/public/face.jpg', function(req, res) {
  res.sendFile('face.jpg', {
    root: 'api/public_res'
  });
})

api.get('/public/posts.json', function(req, res) {
  console.log('getting posts');
  res.sendFile('posts.json', {
    root: 'api/public_res'
  });
})

// Project's Area

var projects = express();
projects.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/projects', projects);
projects.use('/', express.static('projects'));

projects.get('/', function(req, res) {
  res.sendFile('index.html');
})


function address(address, name, mimetype) {
  type = mimetype.match(/(text|image|audio|video|application)/g);
  if (type) {
    address = address + type + '/' + name;
    console.log(address);
    return address;
  } else {
    return 'MimeType Not Supported';
  }
}


// Asset Manager
fs.readdir('./assests/', update);

function update(err, files) {
  // console.log(files);
}


// Posts Area

var posts = express();
posts.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/posts', posts);

posts.get('/', function(req, res) {
  res.send('<h1>Hell Yeah !</h1>')
})

posts.get('/:id', function(req, res) {
  var digit = req.params;
  res.send('<h1>Hell Yeah' + id + ' !</h1>')
});


fs.readdir('./posts/', check);

function check(err, files) {
  // TODO: check for any file uploaded, if yes edit the registry and vice versa.
  // console.log(files);
  var post = {};
  var json = {};
  for (var i = 0; i < files.length; i++) {
    date = extract(files[i], 'date');
    time = extract(files[i], 'time');
    name = extract(files[i], 'name');
    summary = extract(files[i], 'summary');
    post[date] = {
      [time]: {
        name,
        summary
      }
    };
  }
  console.log(post);
}

function extract(string, type) {
  switch (type) {
    case 'date':
      return string.split('~')[0].split('_').join('/');
      break;
    case 'time':
      return string.split('~')[1].split('_').join(':');
      break;
    case 'name':
      return string.split('~')[2].split('_').join(' ').split('.md').join('.');
      break;
    case 'summary':
      return 0; // TODO: return summary.
      break;
  }
}
