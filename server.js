const express = require('express');         //  Подключаю express
const mongodb =  require('mongodb');        //  Подключаю mongodb
const MongoClient = mongodb.MongoClient();  //  Подключаю могго клиента
const ObjectID = mongodb.ObjectID();        //  Подключаю поле идентификатора базы данных монго
const io = require('socket.io')


// app.use(express.static('node_modules/'));

var app = express()

app.use(express.static('node_modules/purecss/build'));
app.use('/public', express.static('public'));
app.use(express.static('public'));
app.use(express.static('public/js'));
app.use(express.static('node_modules/angular'));
app.use(express.static('node_modules/angular-route'));
app.use(express.static('app'));


app.get('/', function(req,res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/getCards/:parent', function(req,res){
  db.collection('dashboard').find({parent}).toArray(function(err, result){
    if (err) throw err;
    else res.send(result)
  })
});

app.get('/getCards', function(req,res){
  db.collection('dashboard').find().toArray(function(err, result){
    if (err) throw err;
    else res.send(result)
  })
});

app.post('/newcard', function(req, res){
  console.log(req.body);
  // db.collection('dashboard').inset(req.body)
});

MongoClient.connect('mongodb://localhost:27017/local', function(err, database){
  if (err) throw err;
  else {
    db = database;
    app.listen(3002,function(){
      console.log('started');
    })
  }
})
