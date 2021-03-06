const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

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
  var cursor = db.collection('quotes').find().toArray( ( err, result) => {
    if (err) return console.log(err);

    //render index.ejs
    res.render('index.ejs', {quotes: result});
  })

})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log('save to database');
    res.redirect('/');
  })
})

app.put('/quotes', (req, res) => {
  //Handle put request
  db.collection('quotes').findOneAndUpdate(
    {
      name: 'Yoda'
    },
    {
      $set: {
        name: req.body.name,
        quote: req.body.quote
      }
    },
    {
      sort: {_id:-1},
      upsert: true
    },
    (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    }
  )
})

app.delete('/quotes', (req, res) => {
  db.collection('quotes').findOneAndDelete(
    {
      name: req.body.name
    },
    (err, result) => {
      if (err) return res.send(500, err)
      res.send({
        message: 'A Darth Vader quote was deleted'
      })
    }
  )
})
