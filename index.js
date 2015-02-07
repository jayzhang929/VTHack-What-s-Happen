var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var db = require('monk')('localhost:27017/mydb');
var users = db.get('users');

//asking the front end to see the folder
app.use(express.static(__dirname + '/css'));

app.get('/', function(req, res){
  res.sendfile('index.html');
  
});
app.get('/test', function(req,res){
    users.find({}, function(err, data) {
      console.log(data);
    });
    return  
});
app.get('/form', function(req, res) {
    users.insert({name: req.query['username'], EventName: req.query['eventname'], Loc: req.query['location']});
    res.send('Username: ' + req.query['username'] + 
      'Eventname: ' + req.query['eventname'] + 
      'Location: ' + req.query['location']);

});

	
io.on('connection', function(socket){
  //reading the file
  socket.on('newsRequest', function(data) {
    users.find({}, function(err, data) {
      console.log(data.length);
      socket.emit('news', data);
    });
    
  });
  

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


