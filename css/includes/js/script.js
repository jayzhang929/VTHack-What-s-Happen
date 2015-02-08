/*

My Custom JS
============

Author:  Brad Hussey
Updated: August 2013
Notes:   Hand coded for Udemy.com

*/
// script for thumbnails display on services page

var socket = io();
$( document ).ready(function() {
    $("[rel='tooltip']").tooltip();    
 
    $('.thumbnail').hover(
        function(){
            $(this).find('.caption').slideDown(250); //.fadeIn(250)
        },
        function(){
            $(this).find('.caption').slideUp(250); //.fadeOut(205)
        }
    ); 
});



// script for tool tips for post services
//select all desired input fields and attach tooltips to them
      $("#post-template :input").tooltip({
 
      // place tooltip on the right edge
      position: "center right",
 
      // a little tweaking of the position
      offset: [-2, 10],
 
      // use the built-in fadeIn/fadeOut effect
      effect: "fade",
 
      // custom opacity setting
      opacity: 0.7
 
      });



   //  carousel on service detail page
$('.carousel').carousel({
  interval: false
});



$(document).ready( function() {
    $('#myCarousel').carousel({
      interval:   4000
  });
  
  var clickEvent = false;
  $('#myCarousel').on('click', '.nav a', function() {
      clickEvent = true;
      $('.nav li').removeClass('active');
      $(this).parent().addClass('active');    
  }).on('slid.bs.carousel', function(e) {
    if(!clickEvent) {
      var count = $('.nav').children().length -1;
      var current = $('.nav li.active');
      current.removeClass('active').next().addClass('active');
      var id = parseInt(current.data('slide-to'));
      if(count == id) {
        $('.nav li').first().addClass('active');  
      }
    }
    clickEvent = false;
  });
});


   //  table on browse mission page

$(function () {
    $( '#table' ).searchable({
        striped: true,
        oddRow: { 'background-color': '#f5f5f5' },
        evenRow: { 'background-color': '#fff' },
        searchType: 'fuzzy'
    });
    
    $( '#searchable-container' ).searchable({
        searchField: '#container-search',
        selector: '.row',
        childSelector: '.col-xs-4',
        show: function( elem ) {
            elem.slideDown(100);
        },
        hide: function( elem ) {
            elem.slideUp( 100 );
        }
    });
});



//making post decision page 

$(document).ready( function() {
    $('#myCarousel-posting-decision').carousel({
      interval:   4000
  });
  
  var clickEvent = false;
  $('#myCarousel-posting-decision').on('click', '.nav a', function() {
      clickEvent = true;
      $('.nav li').removeClass('active');
      $(this).parent().addClass('active');    
  }).on('slid.bs.carousel', function(e) {
    if(!clickEvent) {
      var count = $('.nav').children().length -1;
      var current = $('.nav li.active');
      current.removeClass('active').next().addClass('active');
      var id = parseInt(current.data('slide-to'));
      if(count == id) {
        $('.nav li').first().addClass('active');  
      }
    }
    clickEvent = false;
  });
});


//mission detail: mission related questions slide up/down

 $(document).on('click', '.panel-heading span.clickable', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).on('click', '.panel div.clickable', function (e) {
    var $this = $(this);
    if (!$this.hasClass('panel-collapsed')) {
        $this.parents('.panel').find('.panel-body').slideUp();
        $this.addClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-minus').addClass('glyphicon-plus');
    } else {
        $this.parents('.panel').find('.panel-body').slideDown();
        $this.removeClass('panel-collapsed');
        $this.find('i').removeClass('glyphicon-plus').addClass('glyphicon-minus');
    }
});
$(document).ready(function () {
    $('.panel-heading span.clickable').click();
    $('.panel div.clickable').click();
});


//index-thumbnail-slider
$(document).ready(function() {
    $('#Carousel').carousel({
        interval: 5000
    });
});


// Mission Details page: script for tool tips for the questions mark for COMMENTS
      $("#help-comments-mission-details").tooltip({
 
      // place tooltip on the right edge
      position: "center ",
 
      // a little tweaking of the position
      offset: [-2, 10],
 
      // use the built-in fadeIn/fadeOut effect
      effect: "fade",
 
      // custom opacity setting
      opacity: 0.7
 
      });

              /* --------------------------------------
         mission detail applicants' application details
           -------------------------------------- */
$(document).ready(function() {
    //var panels = $('.applicants-infos');
    //var panelsButton = $('.dropdown-user');
    //panels.hide();

    ////Click dropdown
    //panelsButton.click(function() {
        ////get data-for attribute
        //var dataFor = $(this).attr('data-for');
        //var idFor = $(dataFor);

        ////current button
        //var currentButton = $(this);
        //idFor.slideToggle(400, function() {
            ////Completed slidetoggle
            //if(idFor.is(':visible'))
            //{
                //currentButton.html('<i class="glyphicon glyphicon-chevron-up text-muted"></i>');
            //}
            //else
            //{
                //currentButton.html('<i class="glyphicon glyphicon-chevron-down text-muted"></i>');
            //}
        //});
    //});


    //$('[data-toggle="tooltip"]').tooltip();

    $('button').click(function(e) {
        e.preventDefault();
        var target = $(e.currentTarget);
        if(target.hasClass("active")){
          target.removeClass("active");
        } else {
          target.addClass("active");
        }
        var enabled = [];
        var form = document.forms.buttons;
        var children = $(form).children().each(function(){
          if($(this).hasClass("active"))
            enabled.push($(this).text());
        });
        socket.emit("filter", enabled);
    });
});


// posting mission page: template. 
$(document).ready(function() {

    $("#type").change(function() {
        var val = $(this).val();
        if (val == "item1") {
            $("#size").html("<option value='test'>item1: test 1</option><option value='test2'>item1: test 2</option>");
        } else if (val == "item2") {
            $("#size").html("<option value='test'>item2: test 1</option><option value='test2'>item2: test 2</option>");

        } else if (val == "item3") {
            $("#size").html("<option value='test'>item3: test 1</option><option value='test2'>item3: test 2</option>");

        }
    });


});


/* --------------------------------------
 post mission tempalte  questions for bidders
   -------------------------------------- */

        var addFormGroup = function (event) {
            event.preventDefault();

            var $formGroup = $(this).closest('.form-group');
            var $multipleFormGroup = $formGroup.closest('.multiple-form-group');
            var $formGroupClone = $formGroup.clone();

            $(this)
                .toggleClass('btn-default btn-add btn-danger btn-remove')
                .html('-');

            $formGroupClone.find('input').val('');
            $formGroupClone.insertAfter($formGroup);

            var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');
            if ($multipleFormGroup.data('max') <= countFormGroup($multipleFormGroup)) {
                $lastFormGroupLast.find('.btn-add').attr('disabled', true);
            }
        };

        var removeFormGroup = function (event) {
            event.preventDefault();

            var $formGroup = $(this).closest('.form-group');
            var $multipleFormGroup = $formGroup.closest('.multiple-form-group');

            var $lastFormGroupLast = $multipleFormGroup.find('.form-group:last');
            if ($multipleFormGroup.data('max') >= countFormGroup($multipleFormGroup)) {
                $lastFormGroupLast.find('.btn-add').attr('disabled', false);
            }

            $formGroup.remove();
        };

        var countFormGroup = function ($form) {
            return $form.find('.form-group').length;
        };

        $(document).on('click', '.btn-add', addFormGroup);
        $(document).on('click', '.btn-remove', removeFormGroup);


/*-----------
 * socket.io stuff
*/
function generate(data, num){
  var template = "<li class='list-group-item'>" +
  "                  <div class='row'>" +
  "                    <div class='col-md-2  col-sm-2 col-xs-4'>" +
  "                        <img src='http://placehold.it/150' class=' img-responsive' alt=''>   " +
  "                    </div><!--end of col-md-1 col-sm-2 col-xs-3-->" +
  "        <!-- event basic information -->" +
  "                  <div class='col-md-4 col-sm-3 col-xs-7'>" +
  "                      <a href='#'><strong>$NAME</strong></a>  " +
  "                        <div class='mic-info'><i class='fa fa-clock-o'></i>$DATETIME    <i class='fa fa-crosshairs'></i>$SPONSOR</div>" +
  "                        <div class='mic-info hoster'> <u>$LOCATION</u></div>" +
  "                         <div class='mic-info category'>$TAGS</div>" +
  "                             " +
  "                    </div>" +
  "         <!-- event basic information -->" +
  "          <!--                 event partial details                   -->" +
  "             <div class='hidden-phone star-rating col-md-5 col-sm-5 hidden-xs'> " +
  "                                    <p>$INFO_ALT</p>" +
  "            </div> " +
  "          <!--                 event partial details                   -->" +
  "            <div class='col-xs-1 col-sm-1 col-md-1 col-lg-1 dropdown-user' data-for='.event$NUM'><i class='glyphicon glyphicon-chevron-down text-muted'></i></div>" +
  "        </div>" +
  "        <div class='row applicants-infos event$NUM' style='display: block;'>" +
  "            <div class='col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xs-offset-0 col-sm-offset-0 col-md-offset-1 col-lg-offset-1'>" +
  "              <hr>" +
  "                <div class='panel panel-primary'>" +
  "                    <div class='panel-heading'>" +
  "                        <h3 class='panel-title'>More Details</h3>" +
  "                    </div>" +
  "                    <div class='panel-body'>" +
  "                        <div class='row'>" +
  "                            <div class=' col-md-12 col-sm-12 col-xs-12'>" +
  "                               <p>$INFO</p><p>" +
  "                          </p></div>" +
  "                    </div>" +
  "                </div>" +
  "            </div>" +
  "        </div>" +
  "      </div></li>";
  var name = data.eventname;
  template = template.replace(/\$NAME/,name);
  var sponsor = data.name;
  template = template.replace(/\$SPONSOR/,sponsor);
  var datetime = data.date;
  template = template.replace(/\$DATETIME/,datetime);
  var loc = data.loc;
  template = template.replace(/\$LOCATION/,loc);
  var tags = data.tags;
  template = template.replace(/\$TAGS/,tags);
  var description = data.description;
  var mini_description;
  if (description.length > 397){
    mini_description = description.substring(0,397) + "...";
  } else {
    mini_description = description;
  }
  template = template.replace(/\$INFO_ALT/,mini_description);
  template = template.replace(/\$INFO/,description);
  template = template.replace(/\$NUM/,num);
  template = template.replace(/\$NUM/,num);
  return $(template);
}



var internal_index = 0;
socket.on('today', function(data){
  if(data === null){
    return;
  }
  var year, month, date, time, tagstr, description;
  $('#textUpdate').empty();
  var item;
  var loc = $($(".list-group")[0]);
  loc.empty();
  $("#today").text(data.length);
  for(var index=0; index<data.length; index++){
    item = generate(data[index], internal_index);
    internal_index++;
    loc.append(item);
  }
});
socket.on('tomorrow', function(data){
  if(data === null){
    return;
  }
  var year, month, date, time, tagstr, description;
  $('#textUpdate').empty();
  var item;
  var loc = $($(".list-group")[1]);
  loc.empty();
  $("#tomorrow").text(data.length);
  for(var index=0; index<data.length; index++){
    item = generate(data[index], internal_index);
    internal_index++;
    loc.append(item);
  }
    var panels = $('.applicants-infos');
    var panelsButton = $('.dropdown-user');
    panels.hide();

    //Click dropdown
    panelsButton.click(function() {
        //get data-for attribute
        var dataFor = $(this).attr('data-for');
        var idFor = $(dataFor);

        //current button
        var currentButton = $(this);
        idFor.slideToggle(400, function() {
            //Completed slidetoggle
            if(idFor.is(':visible'))
            {
                currentButton.html('<i class="glyphicon glyphicon-chevron-up text-muted"></i>');
            }
            else
            {
                currentButton.html('<i class="glyphicon glyphicon-chevron-down text-muted"></i>');
            }
        });
    });

    $('[data-toggle="tooltip"]').tooltip();
});
socket.emit("filter",[]);
        
