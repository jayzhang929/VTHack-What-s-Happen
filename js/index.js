var socket = io();
function get_selected(select){
  var raw = select.selectedOptions;
  var output = [];
  $(raw).each(function(index){
    output.push(this.value);
  });
  return output;

}

function infoReq(){
  console.log("Got here!");
  socket.emit('req', "");
}


socket.on('filterReturn', function(data){
  if(data === null){
    return;
  }
  console.log(data);
  var year, month, date, time, tagstr, description, img;
  $('#textUpdate').empty();
  for(var index=0; index<data.length; index++){
    var dateBreakDown = data[index].date.split(/(\d+)/);
    year = dateBreakDown[1];
    month = dateBreakDown[3];
    date = dateBreakDown[5];
    time = dateBreakDown[7] + dateBreakDown[8] + dateBreakDown[9];
    tagstr = "|";
    for(var i = 0; i < data[index].tags.length; i++){
      tagstr = tagstr + data[index].tags[i];
      tagstr = tagstr + "|";
    }
    description = data[index].description;
    img = data[index].img;
     $('#textUpdate').append($('<li>').text(data[index].name + ", " + data[index].eventname + ", " +
         data[index].loc + ", Month: " + month + ", Date: " + date + ", Time: " + time+ ", "+tagstr+", Description: "+description) 
        + ", imgSrc: " + img);
  }
});


socket.on('infoSent', function(data){
  if(data === null){
    return;
  }
  console.log(data);
  var year, month, date, time, tagstr, description;
  $('#textUpdate').empty();
  for(var index=0; index<data.length; index++){
    var dateBreakDown = data[index].date.split(/(\d+)/);
    year = dateBreakDown[1];
    month = dateBreakDown[3];
    date = dateBreakDown[5];
    time = dateBreakDown[7] + dateBreakDown[8] + dateBreakDown[9];
    tagstr = "|";
    for(var i = 0; i < data[index].tags.length; i++){
      tagstr = tagstr + data[index].tags[i];
      tagstr = tagstr + "|";
    }
    description = data[index].description;
     $('#textUpdate').append($('<li>').text(data[index].name + ", " + data[index].eventname + ", " +
         data[index].loc + ", Month: " + month + ", Date: " + date + ", Time: " + time+ ", "+tagstr+", Description: "+description) );
  }
});

function form_run(){
  var form = document.forms.form;
  var eventname = form.eventname.value;
  var username = form.username.value;
  var loc = form.location.value;
  var date = form.date.value;
  var time = form.time.value;
  var tags = get_selected(form.tags);
  var description = form.description.value;
  if(eventname === "" || username === "" || loc === ""){
    return;
  }
  var data = {
    "username": username,
    "eventname": eventname,
    "location": loc,
    "date": new Date(date + " " + time),
    "tags": tags,
    "description": description
  };
  socket.emit("submit", data);
}
	  
	  
