// Javascript file for Weather Server

$(document).ready(function() {
	console.log('ready');
	loadStuff();
});

function loadStuff() {
	console.log('loading stuff');
	$.ajax({
	   url : '/se3309_Assign04/src/test.php', // your php file
	   type : 'GET', // type of the HTTP request
	   success : function(data){
	      var obj = jQuery.parseJSON(data);
	      // console.log(obj);
	      $.each(obj, function(){
	      	$('#weathers').append('<li>High: ' + this.high + ' Low: ' + this.low + '</li>');
	      })
	   }
	});
}