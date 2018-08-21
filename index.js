const express = require('express');
var bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const fs = require('fs');
var showdown = require('showdown'),
  converter = new showdown.Converter();
const cheerio = require('cheerio');


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
// **/******\\*******||     ||***********************  *
// */********\\******||    //*********************  ***
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
      // console.log(assest);
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

api.get('/public/md.css', function(req, res) {
  res.sendFile('md.css', {
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
  res.sendFile('posts.json', {
    root: 'registry'
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
  var ext = name.slice(name.lastIndexOf('.') + 1, name.length);
  if (ext == 'md') {
    function date(name) {
      var date = new Date();
      day = date.getDay().toString(),
        month = date.getMonth().toString(),
        year = date.getFullYear().toString(),
        hour = date.getHours().toString(),
        minute = date.getMinutes().toString(),
        seconds = date.getSeconds().toString(),
        milliseconds = date.getMilliseconds().toString(),
        name = name;
      return (day + '_' + month + '_' + year + '~' + hour + '_' + minute + '_' + seconds + '_' + milliseconds + '~' + name);
    }
    return 'F:/github/adi/posts/' + date(name);
  }
  if (ext != 'md') {
    if (type) {
      address = address + type + '/' + name;
      console.log(address);
      return address;
    } else {
      return 'MimeType Not Supported';
    }
  }
}


// Asset Manager

var assests = {};
fs.readdir('./assests/', update);
var asset = {};

function update(err, folders) {
  for (var j = 0; j < folders.length; j++) {
    path = './assests/' + folders[j];
    asset[folders[j]] = [];
    var files = fs.readdirSync(path);
    for (var i = 0; i < files.length; i++) {
      var file = {};
      path = path + "/" + files[i];
      file["size"] = fs.statSync(path).size;
      file["name"] = files[i].split(files[i].split('.')[files[i].split('.').length - 1])[0];
      file["type/extension"] = files[i].split('.')[files[i].split('.').length - 1];
      asset[folders[j]].push(file);
      path = path.split('/' + files[i])[0];
    }
  }
  fs.writeFile('./registry/assests.json', JSON.stringify(asset), (err) => {
    if (err) console.error(err);
    console.log("Assets file Updated.");
  });
}

// Posts Area

var post = {};
var posts = express();
posts.use(bodyParser.urlencoded({
  extended: true
}));
app.use('/posts', posts);

posts.get('/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  var file;
  var posts = JSON.parse(fs.readFileSync('./registry/posts.json', 'utf8'));
  for (var i = 0; i < posts.length; i++) {
    if (posts[i].hash == id) {
      file = posts[i].filename;
    }
  }
  res.send(insertHTML(converter.makeHtml(fs.readFileSync('./posts/' + file, 'utf8'))));
});

fs.readdir('./posts/', check);

async function check(err, files) {
  // TODO: check for any file uploaded, if yes edit the registry and vice versa.
  // console.log(files);
  var post = [];
  for (var i = 0; i < files.length; i++) {
    filename = files[i];
    date = extract(files[i], 'date');
    time = extract(files[i], 'time');
    title = extract(files[i], 'title');
    id = i;
    hash = extract(files[i], 'id');
    summary = await sumIt(files[i]);
    post.push({
      hash,
      filename,
      date,
      time,
      title,
      summary
    });
  }
  fs.writeFile('./registry/posts.json', JSON.stringify(post), (err) => {
    if (err) console.error(err);
    console.log("Posts JSON File updated.");
  });
}



function extract(string, type) {
  switch (type) {
    case 'date':
      return string.split('~')[0].split('_').join('/');
      break;
    case 'time':
      return string.split('~')[1].split('_').join(':');
      break;
    case 'title':
      return string.split('~')[2].split('_').join(' ').split('.md').join('.');
      break;
    case 'id':
      return string.split("").reduce((a, b) => {
        a = ((a >> 5) + a) + b.charCodeAt(0);
        return a & a
      }, 0);
      break;
  }
}

async function sumIt(string) {
  // read the file
  const path = './posts/' + string;
  let promise = new Promise(function(resolve, reject) {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      }
      // convert to html
      var html = converter.makeHtml(data);
      // load it in cheerio
      const $ = cheerio.load(html);
      // find first p tag.
      var string = $('p').first().text();
      if (string.split('').length > 190) {
        var str = '';
        var array = string.split('');
        for (i = 0; i < 190; i++) {
          str += array[i];
        };
        str += '...';
        str = str.toString();
        str.split('\n').join(' ');
        resolve(str);
      } else {
        resolve(string);
      }
      // return.
    })
  });
  return await promise;
}

function insertHTML(html) {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css?family=Courgette|Raleway:300" rel="stylesheet">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
      <script src="/api/public/app.js"></script>
      <link rel="stylesheet" href="https://raw.githubusercontent.com/daneden/animate.css/master/animate.css">
      <link rel="stylesheet" href="/api/public/style.css">
      <link rel="stylesheet" href="/api/public/md.css">
      <style media="screen">
        @media screen and (max-width: 900px) {
          .nav > li > a {
            font-size: 36px;
          }
          main {
            position: fixed;
            z-index: -1;
            width: 100%;
          }
          header {
            width: 100%;
            z-index: 0;
          }
          .name {
            flex-direction: column;
            margin-top: 2rem;
          }
          .name > h1 {
            font-size: 4rem;
            margin: auto;
          }
          .name > img {
            height: 10rem;
            width: 10rem;
            margin-bottom: 2rem;
          }
          #intro > p {
            font-size: 28px;
          }
          .menu > i {
            color: white;
            opacity: 1;
          }
          .close {
            color: white !important;
          }
          .menu {
            border: 3px solid white;
            display: flex;
            flex-direction: column;
            width: 48px;
            height: 48px;
            position: fixed;
            z-index: 1;
            opacity: 1 !important;
            background: linear-gradient(135deg, rgba(81, 81, 81, 1) 40%, rgba(130, 130, 130, 1) 125%);
            bottom: 2rem;
            border-radius: 50%;
            right: 2rem;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.16),0 2px 10px 0 rgba(0,0,0,0.12)!important;
          }
        }
      </style>
    </head>
    <body>
    <div class="menu">
      <i
        class="material-icons hide"
        onclick="js:this.classList.toggle('hide');document.querySelector('.menu').children
      [1].classList.toggle('hide');document.querySelector('header').classList.toggle('hide');document.querySelector('main').classList.toggle('show');">menu</i>
      <i
        class="close material-icons"
        onclick="js:this.classList.toggle('hide');document.querySelector('.menu').children
      [0].classList.toggle('hide');document.querySelector('header').classList.toggle('hide');document.querySelector('main').classList.toggle('show');">close</i>
    </div>
    <header>
      <nav>
        <div class="name">
          <img src="/api/public/face.jpg" alt="Image Not Supported.">
          <h1 onclick="js:document.location.href = 'file:///F:/calc/game/different.html';">Aditya Jha.</h1>
        </div>
        <ul class="nav">
          <li>
            <a href="#intro">about</a>
          </li>
          <li>
            <a href="/projects">projects</a>
          </li>
          <li>
            <a href="/contact">contact</a>
          </li>
        </ul>
        <div id="intro" name="intro">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
            desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
        </div>
      </nav>
    </header>
        <div id="post" style="margin: auto;width: 60%;padding: 1%;margin-left: 3%;background: #ffffff;box-shadow: 0 0 25px 15px #fff;">` + html + `
        </div>
      </body>
    </html>`;
}
