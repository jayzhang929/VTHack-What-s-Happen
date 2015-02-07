var socket = io();
function form_run(){
  var form = document.forms.form;
  eventname = form.eventname.value;
  username = form.username.value;
  month = form.month.value;
  date = form.date.value;
  time = form.time.value;
  loc = form.location.value;
  timere = time.split(/(\d+)/);
  console.log(timere)
  if(eventname === "" || username === "" || loc === ""){
    return;
  }
  var data = {
    "username": username,
    "eventname": eventname,
    "location": loc,
    "date": new Date(2015, month, date, parseInt(timere[1]), parseInt(timere[3]))
  };
  socket.emit("submit", data);
}


socket.on('news', function(data){
  //$('#content').append(data);
  var year, month, date, time;
  for(var index=0; index<data.length; index++){
    var dateFieldBreakDown = data[index].DateField.split(/(\d+)/);
    year = dateFieldBreakDown[1];
    month = dateFieldBreakDown[3];
    date = dateFieldBreakDown[5];
    time = dateFieldBreakDown[7] + dateFieldBreakDown[8] + dateFieldBreakDown[9];
    console.log();
     $('#textUpdate').append($('<li>').text(data[index].name + " " + data[index].EventName + " " + data[index].Loc + " Month: " + month + " Date: " + date + " Time: " + time) );
  }
});
socket.emit("newsRequest","");
	  
	  
