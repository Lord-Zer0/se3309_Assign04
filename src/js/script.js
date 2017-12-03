// Javascript file for Weather Server

var PATH = 'http://localhost/se3309_Assign04/src/';
var LOGGED_IN;

$(document).ready(function() {
	console.log('ready');
	setNavBar();
	checkLogin();
	showContent();
	// just an example
	loadStuff();
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

function loadStuff() {
	$.ajax({
		url: '/se3309_Assign04/src/server/test.php', // your php file
		type: 'GET', // type of the HTTP request
		success: function(data){
			var obj = jQuery.parseJSON(data);
			// console.log(obj);
			$.each(obj, function(){
				$('#weathers').append('<li>High: ' + this.high + ' Low: ' + this.low + '</li>');
			});
		}
	});
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
				'<li class="nav-item">'+
					'<a class="nav-link" href="./login.html">Login</a>'+
				'</li>'+
				'<li class="nav-item">'+
					'<a class="nav-link" href="./register.html">Register</a>'+
				'</li>'+
			'</ul>'+
		'</div>'+
	'</nav>'
	;
	$('#nav').append(navbar);
}