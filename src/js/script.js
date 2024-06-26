// Javascript file for Weather Server

var PATH = 'http://localhost/se3309_Assign04/src/';
var LOGGED_IN;

$(document).ready(function() {
	checkLogin();
	setNavBar();
	showContent();
	console.log('ready');
});

function checkLogin() {
	if(localStorage.getItem('currentUser')) {
		LOGGED_IN = true;
		console.log('logged in');
	}
	else {
		LOGGED_IN = false;
	}
}

// shows authed or unauthed content
function showContent() {
	if(!LOGGED_IN) {
		$('.unauthed').css('display', 'block');
		$('.authed').css('display', 'none');
	}
	else {
		$('.authed').css('display', 'block');
		$('.unauthed').css('display', 'none');
	}
}

function register() {
	var _name  = $('#regName').val();
	var _email = $('#regEmail').val();
	var _pass  = $('#regPassword').val();
	var user = {
		name: _name,
		email: _email,
		password: _pass
	};
	$.ajax({
		url: '/se3309_Assign04/src/server/register.php', // your php file
		type: 'POST', // type of the HTTP request
		data: user,
		dataType: "json",
		success: function(data){
			console.log(data);
			if(data.message == "registered") {
				console.log(data.message)
				localStorage.setItem('currentUser', data.email);
				window.location.href = PATH + "/index.html";
			}
			else {
				console.log(data.message);
			}
		},
		error: function(err) {
			console.log('error', err);
		}
	});
}

function login() {
	var _email = $('#loginEmail').val();
	var _pass  = $('#loginPassword').val();
	var user = {
		email: _email,
		password: _pass
	};
	$.ajax({
		url: '/se3309_Assign04/src/server/login.php', // your php file
		type: 'POST', // type of the HTTP request
		data: user,
		dataType: "json",
		success: function(data){
			console.log(data);
			if(data.message == "authenticated") {
				console.log(data.message)
				localStorage.setItem('currentUser', data.email);
				window.location.href = PATH + "/index.html";
			}
			else {
				console.log(data.message);
			}
		},
		error: function(err) {
			console.log('error', err);
		}
	});
	// $(window).location('index.html');
}

function logout() {
	localStorage.removeItem('currentUser');
	window.location.href = PATH + "/index.html";
}

function searchLocations(option) {
	// console.log('Searching locations for', $('#searchQuery').val());
	var _q = $('#searchQuery').val();
	if(_q == '' || _q == ' ') {
		$('#noresults').css('display', 'none');
		$('#searchResults').html('');
		return 0;
	}
	var query = {
		term: _q
	};
	var row = '<div class="row my-2 py-3 rounded bg-secondary">'
	var col = '<div class="col-sm-3 text-center">';
	var end = '</div>';
	$.ajax({
		url: '/se3309_Assign04/src/server/searchlocations.php', // your php file
		type: 'POST', // type of the HTTP request
		data: query,
		dataType: "json",
		success: function(data){
			$('#locExists').css('display', 'none');
			$('#locAdded').css('display', 'none');
			if(data.length > 0) {
				$('#noresults').css('display', 'none');
				$('#searchResults').html('');
				$.each(data, function(){
					if(option == 'a') {
						var but = '<button class="btn btn-primary" onclick="addLoc('+this.loc_id+')">Add</button>';
					}
					else if(option == 'r') {
						var but = '<button type="button" class="btn btn-primary" onclick="selectLoc('+this.loc_id+',\''+this.city+'\')">Select</button>';
					}
					$('#searchResults')
					.append(row + col + this.city + end + col + this.province + end + col + this.country + end + col + but + end + end);
				});
			}
			else {
				$('#noresults').css('display', 'block');
				$('#searchResults').html('');
			}
		},
		error: function(err) {
			console.log('error', err);
		}
	});
}

function addLoc(_id) {
	var _email = localStorage.getItem('currentUser');
	var loc = {
		id: _id,
		email: _email
	};
	$.ajax({
		url: '/se3309_Assign04/src/server/addlocation.php', // your php file
		type: 'POST', // type of the HTTP request
		data: loc,
		dataType: "json",
		success: function(data) {
			if(data.message == 'exists') {
				$('#locExists').css('display', 'block');
				$('#locAdded').css('display', 'none');	
			}
			else {
				$('#locAdded').css('display', 'block');	
				$('#locExists').css('display', 'none');
			}			
			console.log(data);
		},
		error: function(err) {
			console.log('error', err);
		}
	});
}

var REPORT_CITY_ID = -1;

function selectLoc(_id, city) {
	REPORT_CITY_ID = _id;
	$('#searchQuery').val(city);
	$('#searchResults').html('');
}

function submitReport() {
	var _email = localStorage.getItem('currentUser');
	var _temp = $('#reportTemp').val();
	var yes = $('#reportYes').prop('checked');
	var no = $('#reportNo').prop('checked');
	var _yORn = yes ? 'y' : 'n';
	var _comments =  $('#reportComments').val();
	console.log(_temp, REPORT_CITY_ID, _comments, _yORn, _email);
	if(REPORT_CITY_ID == -1) {
		$('#noReportLoc').css('display', 'block');
	}
	else {
		var report = {
			temp: _temp,
			prec: _yORn,
			comments: _comments,
			locationID: REPORT_CITY_ID,
			email: _email
		};
		console.log(report);
		$.ajax({
			url: '/se3309_Assign04/src/server/submitreport.php', // your php file
			type: 'POST', // type of the HTTP request
			data: report,
			dataType: "json",
			success: function(data) {
				console.log(data);
			},
			error: function(err) {
				console.log('error', err);
			}
		});
	}
}

function setNavBar() {
	var navbar = 
	'<nav class="navbar navbar-expand-lg navbar-dark bg-primary">'+
		'<a class="navbar-brand" href="index.html">Weatherbase</a>'+
		'<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">'+
			'<span class="navbar-toggler-icon"></span>'+
		'</button>'+
		'<div class="collapse navbar-collapse" id="navbarNav">'+
			'<ul class="navbar-nav">'+
				'<li class="nav-item">'+
					'<a class="nav-link" href="./index.html">Home</a>'+
				'</li>'+
				'<li class="nav-item unauthed">'+
					'<a class="nav-link" href="./login.html">Login</a>'+
				'</li>'+
				'<li class="nav-item unauthed">'+
					'<a class="nav-link" href="./register.html">Register</a>'+
				'</li>'+
			'</ul>'+
		'</div>'+
	'</nav>'
	;
	$('#nav').append(navbar);
}