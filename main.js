var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var db = require('monk')('localhost:27017/mydb');
var users = db.get('users');
var today = new Date();
users.index({'DateField': 1}, {'DateField': { $gt: today }});

//asking the front end to see the folder
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/css'));

app.get('/', function(req, res){
  //res.sendfile('index.html');
  res.sendfile('VThack.html');
});
app.get('/old', function(req, res){
  res.sendfile('index.html');
});
app.get('/test', function(req,res){
    users.find({}, function(err, data) {
      console.log(data);
    });
});
	
io.on('connection', function(socket){
  //reading the file
  socket.on('newsRequest', function(data) {
    users.find({ 'DateField' : { $gt: today } }, { sort: { 'DateField': 1 } }, function(err, data) {
      socket.emit('news', data);
    });
  });
  socket.on('submit', function(data){
    console.log(data);
    users.insert({name: data.username, EventName: data.eventname, Loc: data.location, DateField: new Date(data.date)});
    users.find({ 'DateField' : { $gt: today } }, { sort: { 'DateField': 1 } }, function(err, data) {
      socket.emit('news', data);
    });
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

