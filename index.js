let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let urlencondedParser = bodyParser.urlencoded({extended: false});
let fs = require('fs');
let db = require('./connetc-to-db');

app.set('view engine', 'ejs');

app.get('/', function (req, res) {

  let posts;

  if (fs.existsSync('./posts.txt')) {
    posts = fs.readFileSync('./posts.txt', 'utf8');
    posts = JSON.parse(posts);
  } else {
    posts = false;
  }

  res.render('home', {posts: posts});
});

app.get('/post/:id', function (req, res) {

  if(req.params.id){
    let posts;

    if (fs.existsSync('./posts.txt')) {
      posts = fs.readFileSync('./posts.txt', 'utf8');
      posts = JSON.parse(posts);

      res.render('page', {post: posts[req.params.id]})
    } else {
      res.status(404);
    }
  }else{
    res.status(404);
  }

});

app.get('/about', function (req, res) {
  res.render('about');
});
app.get('/contact', function (req, res) {
  res.render('contact');
});
app.get('/login', function (req, res) {
  res.render('login');
});

let adminData = fs.readFileSync('./admindata.txt', 'utf8');

let login = adminData.split(' ')[0].split(':')[1];
let pass = adminData.split(' ')[1].split(':')[1];

app.set('view engine', 'ejs');

app.post('/login', urlencondedParser, function (req, res) {
  if (req.body.login === login && req.body.password === pass) {
    res.render('addnewpost', {noData: false, success: false});
  } else {
    res.status(404).send('It is just for me');
  }
});

app.post('/addnewpost', urlencondedParser, function (req, res) {
  if (!req.body) {
    res.render('addnewpost', {noData: true, success: false});
  } else {

    // if (!fs.existsSync('./posts.txt')) {
    //   let postsArray = [];
    //
    //   postsArray.push(req.body);
    //   fs.writeFile('posts.txt', JSON.stringify(postsArray), function () {});
    //   res.render('addnewpost', {noData: false, success: true});
    // } else {
    //   let posts;
    //
    //   posts = fs.readFileSync('./posts.txt', 'utf8');
    //   posts = JSON.parse(posts);
    //   posts.push(req.body);
    //
    //   fs.writeFile('posts.txt', JSON.stringify(posts), function () {});
    //   res.render('addnewpost', {noData: false, success: true});
    // }

    db.addPost(req.body)

  }
});

app.listen(3000);