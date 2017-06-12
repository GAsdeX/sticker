const express = require('express');         //  Подключаю express
const mongodb =  require('mongodb');        //  Подключаю mongodb
const MongoClient = mongodb.MongoClient();  //  Подключаю могго клиента
const OdjectID = require('mongodb').ObjectID;       //  Подключаю поле идентификатора базы данных монго
const bodyParser = require('body-parser');

var Authorization = require('node-authorization').Authorization;
var compileProfile = require('node-authorization').profileCompiler;

var Authorization = new Authorization('UserID', compiledProfile);
if(!Authorization.check('blog', {Tag:'DB',ID:1000001, Action:'Add'})){
    //Report a message, and break;
 }else{
    //Do the add blog;
 }

// app.use(express.static('node_modules/'));

var app     = express();
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);

server.listen(app.get('port')); // not 'app.listen'!

app.use(express.static('node_modules/purecss/build'));  //Добавляю папки с приложением в облатсь видимости приложения
app.use('/public', express.static('public'));
app.use(express.static('public'));
app.use(express.static('public/js'));
app.use(express.static('node_modules/angular'));
app.use(express.static('node_modules/angular-route'));
app.use(express.static('app'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req,res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/getCards/:parent', function(req,res){
  db.collection('dashboard').find({parent : req.params.parent}).toArray(function(err, result){
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

app.get('/getCard/:_id', function(req,res){
  console.log(';;');
  db.collection('dashboard').find({_id : OdjectID(req.params._id)}).toArray(function(err, result){
    if (err) throw err;
    else res.send(result)
  })
});

app.post('/changecard', function(req, res){
  console.log(req.body);
});

app.get('/newcard/:parent', function(req, res){
  // console.log(req.body);
  var card =
      { parent: req.params.parent,
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
              "fon_color":"#000"
            }
          }
  db.collection('dashboard').insert(card , function (err, result) {
    if (err) throw err;
    else res.sendStatus(200);
  })
});

app.post('/test', function(req, res) {
  console.log(req.body);
})

app.put('/newpos/:_id', function(req,res) {

  var item = {
    style : {
      sticker_top : req.body.y,
      sticker_left : req.body.x
    }
  }


  console.log(item);

  db.collection('dashboard').update({_id : OdjectID(req.params._id)} ,{ $set : item}, function(err, reslut) {
    if (err) throw err;
    else res.send(reslut)
  })
});

app.put('/changecard/:_id', function(req, res) {
  console.log(req.params._id);

  var item = req.body

  db.collection('dashboard').update({_id : OdjectID(req.params._id)} ,{ $set : item}, function(err, reslut) {
    if (err) throw err;
    else res.send(reslut)
  })
});

app.delete('/changecard/:_id', function (req,res){
  db.userdetails.remove( { "user_id" : "testuser" } )
})

// Регистрация

app.post('/registrate', function(req,res){
  console.log(req.body);
  db.collection('users').find({name : req.body.user, password : req.body.pass}).toArray(function (err, result){
      if (err) throw err;
      else res.send(result);
  });
});


passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      
      //Begin profiles roll-in
      //Get user raw profiles, compile them, and save the compiled profile to the user(session) object
      ...
      user.authProfile = compileProfile(rawProfiles);
      //End profiles roll-in

      return done(null, user);
    });
  }
));


MongoClient.connect('mongodb://localhost:27017/local', function(err, database){
  if (err) throw err;
  else {
    db = database;

    server.listen(8003);
    app.listen(8003,function(){
      console.log('started');
    })
  }
})
