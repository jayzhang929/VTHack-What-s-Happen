var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');

//asking the front end to see the folder
app.use(express.static(__dirname + '/css'));

app.get('/', function(req, res){
  res.sendfile('index.html');
  
});

app.get('/form', function(req, res) {
    res.send('Username: ' + req.query['username'] + 
      'Eventname: ' + req.query['eventname'] + 
      'Location: ' + req.query['location']);
});

	
io.on('connection', function(socket){
  //reading the file
  socket.on('newsRequest', function(data) {
    socket.emit('news', "VTHack is going on now!");
  });
  

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


