var socket = io();
function form_run(){
  var form = document.forms.form;
  eventname = form.eventname.value;
  username = form.username.value;
  loc = form.location.value;
  if(eventname === "" || username === "" || loc === ""){
    return;
  }
  var data = {
    "username": username,
    "eventname": eventname,
    "location": loc
  };
  socket.emit("submit", data);
}


 socket.on('news', function(data){
    //$('#content').append(data);
    console.log(data.length);
    console.log(data);
    var length = data.length;
    $('#textUpdate').empty();
    while (length > 0) {
       $('#textUpdate').append($('<li>').text(data[length - 1].name + " " + data[length - 1].EventName + " " + data[length - 1].Loc) );
      length--;
    }
 });
socket.emit("newsRequest","");
	  
	  
