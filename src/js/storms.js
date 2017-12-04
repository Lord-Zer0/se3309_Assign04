var COUNTRY = '%';
var PROVINCE = '%';
var CITY = '%';

$(document).ready(function() {
	getOptions();
});

function getOptions(argument) {
	var search = {
		country: COUNTRY,
		province: PROVINCE,
		city: CITY,
		type: 'filter'
	}
	$.ajax({
		url: '/se3309_Assign04/src/server/storms.php', // your php file
		type: 'POST', // type of the HTTP request
		data: search,
		dataType: "json",
		success: function(data){
			console.log(data);
			$('#stormCountry').html('');
			$('#stormProv').html('');
			$('#stormCity').html('');
			$.each(data.countries, function(){
				$('#stormCountry')
				.append('<option value="'+this.country+'">' + this.country + '</option>');
			});
			$.each(data.provinces, function(){
				$('#stormProv')
				.append('<option value="'+this.province+'">' + this.province + '</option>');
			});
			$.each(data.cities, function(){
				$('#stormCity')
				.append('<option value="'+this.city+'">' + this.city + '</option>');
			});
			$('#stormCountry').prepend('<option value="%">Any</option>');
			$('#stormProv').prepend('<option value="%">Any</option>');
			$('#stormCity').prepend('<option value="%">Any</option>');
		},
		error: function(err) {
			console.log('error', err);
		}
	});
}

function setCountry() {
	COUNTRY = $('#stormCountry').val();
	console.log(COUNTRY, ' - ', PROVINCE, ' - ', CITY);
	if(COUNTRY != '%') getOptions();
}

function setProv() {
	PROVINCE = $('#stormProv').val();
	console.log(COUNTRY, ' - ', PROVINCE, ' - ', CITY);
	if(PROVINCE != '%') getOptions();
}

function setCity() {
	CITY = $('#stormCity').val();
	console.log(COUNTRY, ' - ', PROVINCE, ' - ', CITY);
}

function stormSearch() {
	COUNTRY = $('#stormCountry').val();
	PROVINCE = $('#stormProv').val();
	CITY = $('#stormCity').val();
	var TYPE = $('#stormType').val();
	console.log(COUNTRY, ' - ', PROVINCE, ' - ', CITY, ' - ', TYPE);
	var search = {
		country: COUNTRY,
		province: PROVINCE,
		city: CITY,
		type: TYPE
	}
	var row = '<div class="row my-2 py-3 rounded bg-secondary">'
	var col = '<div class="col-sm-3 text-center">';
	var end = '</div>';
	$.ajax({
		url: '/se3309_Assign04/src/server/storms.php', // your php file
		type: 'POST', // type of the HTTP request
		data: search,
		dataType: "json",
		success: function(data){
			console.log(data);
			if(data.length >0) {
				$('#noresults').css('display', 'none');
				$('#searchResults').html('');
				$.each(data, function(){
					var but = '<button class="btn btn-primary" onclick="addLoc('+this.loc_id+')">Add</button>';
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