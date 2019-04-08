let express = require('express');
let app = express();
let session = require('express-session');
let bodyParser = require('body-parser');
let urlencondedParser = bodyParser.urlencoded({ extended: false });
let DBWorker = require('./connetc-to-db');
const db = new DBWorker();

app.use(session({ secret: 'ssshhhhh' }));
app.set('view engine', 'ejs');

let sess;

app.get('/', (req, res) => {

  db.collectionPosts.find().toArray((err, posts) => {
    res.render('home', { posts: posts });
  })

});

app.get('/post/:id', function (req, res) {

  if (req.params.id) {
    db.collectionPosts.find().toArray((err, posts) => {

      res.render('page', { post: posts[req.params.id] });
    })
  } else {
    res.status(404);
  }

});

app.get('/about', function (req, res) {
  res.render('about');
});

app.get('/contact', function (req, res) {
  res.render('contact');
});

app.get('/registration', (req, res) => {
  res.render('registration')
})

app.post('/registration', urlencondedParser, (req, res) => {

  db.addNewUser(req.body);

})

app.get('/login', function (req, res) {
  sess = req.session;

  if (sess.login) {
    res.redirect('/addnewpost')
  } else {
    res.render('login');
  }
});

app.post('/login', urlencondedParser, function (req, res) {
  sess = req.session;

  db.collectionAdmin.findOne((err, data) => {
    if (req.body.login === data.login && req.body.password === data.password) {
      sess.login = true;
      res.render('addnewpost', { noData: false, success: false });
    } else {
      res.status(404).send('Worng email or password');
    }
  })
});

app.get('/addnewpost', (req, res) => {
  sess = req.session;
  if (sess.login) {
    res.render('addnewpost', { noData: false, success: false });
  } else {
    res.redirect('/login');
  }
})

app.post('/addnewpost', urlencondedParser, function (req, res) {
  if (!req.body) {
    res.render('addnewpost', { noData: true, success: false });
  } else {
    db.insertOnePost(req.body);
    res.render('addnewpost', { noData: false, success: true });
  }
});

app.listen(3000);