var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').pool;

var config = {
    user: 'sairamprakash16',
    database:'sairamprakash16',
    host: 'http://db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var articles = {
    'article-one': {
        title: 'Article one | Sai Ram',
        heading: 'Article one',
        date: 'Sep 3,2017',
        content: ` 
        <p>
                This is the content.This is the content.This is the content.This is the content.This is the content.This is the content
        </p>
        <p>
                This is the content.This is the content.This is the content.This is the content.This is the content.This is the content
        </p>
        <p>
                This is the content.This is the content.This is the content.This is the content.This is the content.This is the content
        </p>    `
    },
    'article-two': {
        title: 'Article two | Sai Ram',
        heading: 'Article two',
        date: 'Sep 3,2017',
        content: ` 
        <p>
                This is the content.This is the content.This is the content.This is the content.This is the content.This is the content
        </p>
        <p>
                This is the content.This is the content.This is the content.This is the content.This is the content.This is the content
        </p>
        <p>
                This is the content.This is the content.This is the content.This is the content.This is the content.This is the content
        </p>    `
        
    },
    'article-three': {
        title: 'Article three | Sai Ram',
        heading: 'Article three',
        date: 'Sep 13,2017',
        content: ` 
        <p>
                This is the content.This is the content.This is the content.This is the content.This is the content.This is the content
        </p>
        <p>
                This is the content.This is the content.This is the content.This is the content.This is the content.This is the content
        </p>
        <p>
                This is the content.This is the content.This is the content.This is the content.This is the content.This is the content
        </p>    `
    },
};

function createTemplate (data) {
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmlTemplate=
    `<html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div class="container">
                <div>
                    <a href='/'>Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db', function (req,res) {
  // make a select request
  //return the response with the results
  pool.query('SELECT * FROM test', function(err,result){
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result));
      }
  });
});

var counter = 0;
app.get('/counter', function (req, res) {
  counter = counter + 1;
  res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function (req, res) {
    //Get the name from the request
    var name = req.query.name;
    names.push(name);
    //JSON: Javascript Object Notation
    res.send(JSON.stringify(names));
});

app.get('/:articlename', function (req, res) {
  var articlename = req.params.articlename;
  res.send(createTemplate(articles[articlename]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/sai.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'sai.jpg'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
