const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

var db;
//server
MongoClient.connect('mongodb://localhost/test-crud', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(3000, function(){
    console.log('listening on 3000');
  });
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('save to database');
    res.redirect('/');
  })
})
