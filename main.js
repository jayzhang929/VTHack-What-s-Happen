var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var db = require('monk')('localhost:27017/mydb');
var multer = require('multer');
var users = db.get('users');
var today = new Date();
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
var dat = new Date(); //day after tomorrow
dat.setDate(dat.getDate() + 2);
var tagsParser = ["Performance", "Social"];
users.index({'date': 1}, {'date': { $gt: today }});
users.index({'tags': {"$all" : tagsParser} });

//asking the front end to see the folder
app.use(express.static(__dirname + '/uploads'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/node_modules'));
app.use('/css',express.static(__dirname + '/css'));


var done=false;
var img;

/*Configure the multer.*/

app.use(multer({ dest: './uploads/',
 rename: function (fieldname, filename) {
    return filename+Date.now();
  },
onFileUploadStart: function (file) {
  console.log(file.originalname + ' is starting ...')
},
onFileUploadComplete: function (file) {
  console.log(file.fieldname + ' uploaded to  ' + file.path)
  done=true;
}
}));

app.post('/api/photo',function(req,res){
  if(done==true){
    console.log(req.files.userPhoto.name);
    img = req.files.userPhoto.name;
    //res.end("File uploaded.");
  }
});


app.get('/123.jpg', function(req, res){
  //res.sendfile('index.html');
  res.sendfile('123.jpg');
});

app.get('/', function(req, res){
  //res.sendfile('index.html');
  res.sendfile('VThack.html');
});
app.get('/old', function(req, res){
  res.sendfile('index.html');
});

app.get('/new', function(req, res){
  res.sendfile('post an event.html');
});

app.get('/test', function(req,res){
    users.find({}, function(err, data) {
      console.log(data);
    });
});
	
io.on('connection', function(socket){
  socket.on('filter', function(data){
   if (data.length === 0){
      users.find({'date': {$gt:today, $lt:tomorrow}}, { sort: { 'date': 1 } }, function(err, data) {
        socket.emit('today', data); 
      });
      users.find({'date': {$gt:tomorrow, $lt:dat}}, { sort: { 'date': 1 } }, function(err, data) {
        socket.emit('tomorrow', data); 
       });
     } else {
      users.find({ 'date' : { $gt: today , $lt: tomorrow}, 'tags' : { "$all" : data} }, { sort: { 'date': 1 } }, function(err, data) {
        socket.emit('today', data);      
      });
      users.find({ 'date' : { $gt: tomorrow , $lt: dat}, 'tags' : { "$all" : data} }, { sort: { 'date': 1 } }, function(err, data) {
        socket.emit('tomorrow', data);      
       });
     }});
  socket.on('req', function(data){
    console.log("req received!");
    users.find({ 'date' : { $gt: today } }, { sort: { 'date': 1 } }, function(err, data) {
      socket.emit('infoSent', data);
      console.log(data);
    });
  });

  
  socket.on('submit', function(data){
    users.insert({
      name: data.username,
      eventname: data.eventname,
      loc: data.location,
      date: new Date(data.date),
      tags: data.tags,
      description: data.description,
      img: img
    });

    users.find({ 'date' : { $gt: today } }, { sort: { 'date': 1 } }, function(err, data) {
      socket.emit('news', data);
    });
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


