const express = require('express');         //  Подключаю express
const mongodb =  require('mongodb');        //  Подключаю mongodb
const MongoClient = mongodb.MongoClient();  //  Подключаю могго клиента
const ObjectID = mongodb.ObjectID();        //  Подключаю поле идентификатора базы данных монго


const bodyParser = require('body-parser');


// app.use(express.static('node_modules/'));

var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);

server.listen(app.get('port')); // not 'app.listen'!

app.use(express.static('node_modules/purecss/build'));
app.use('/public', express.static('public'));
app.use(express.static('public'));
app.use(express.static('public/js'));
app.use(express.static('node_modules/angular'));
app.use(express.static('node_modules/angular-route'));
app.use(express.static('app'));

app.use(bodyParser.urlencoded({ extended: false }));

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

app.post('/changecard', function(req, res){
  // console.log(req);
})


app.get('/newcard', function(req, res){
  // console.log(req.body);
  var card =
      { parent:"d1",
          style: {
            "sticker_color":"#000",
            "sticker_h":"100",
            "sticker_w":"200",
            "sticker_left":"100",
            "sticker_top":"100" },
            "title": {
              "text":"title",
              "font_size":"14",
              "font_color":"#000"},
            "textarea": {"text":"lets do something really awesome",
              "font_size":"14",
              "fon_color":"#000"}
          }
  db.collection('dashboard').insert(card , function (err, result) {
    if (err) throw err;
    else res.sendStatus(200);
  })
});

MongoClient.connect('mongodb://localhost:27017/local', function(err, database){
  if (err) throw err;
  else {
    db = database;

    server.listen(8001);
    app.listen(8001,function(){
      console.log('started');
    })
  }
})
