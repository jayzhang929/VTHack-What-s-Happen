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

    var d = new Date(req.query['month'] + " " + req.query['date'] + ", " + "2015 " + req.query['time']);
    users.insert({name: req.query['username'], EventName: req.query['eventname'], 
                  Loc: req.query['location'], DateField: d});
    //res.send('Username: ' + req.query['username'] + 
      //'Eventname: ' + req.query['eventname'] + 
      //'Location: ' + req.query['location']);

});

	
io.on('connection', function(socket){
  //reading the file
  socket.on('newsRequest', function(data) {
    console.log(today);
    users.find({ 'DateField' : { $gt: today } }, { sort: { 'DateField': 1 } }, function(err, data) {
      console.log(data[0].DateField.getFullYear());
      socket.emit('news', data);
    });
    
  });
  

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


