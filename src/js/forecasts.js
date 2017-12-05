var COUNTRY = '%';
var PROVINCE = '%';
var CITY = '%';

$(document).ready(function () {
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
        url: '/se3309_Assign04/src/server/forecasts.php', // your php file
        type: 'POST', // type of the HTTP request
        data: search,
        dataType: "json",
        success: function(data){
            console.log(data);
            $('#forecastCountry').html('');
            $('#forecastProv').html('');
            $('#forecastCity').html('');
            $.each(data.countries, function(){
                $('#forecastCountry')
                    .append('<option value="'+this.country+'">' + this.country + '</option>');
            });
            $.each(data.provinces, function(){
                $('#forecastProv')
                    .append('<option value="'+this.province+'">' + this.province + '</option>');
            });
            $.each(data.cities, function(){
                $('#forecastCity')
                    .append('<option value="'+this.city+'">' + this.city + '</option>');
            });
            $('#forecastCountry').prepend('<option value="%">Any</option>');
            $('#forecastProv').prepend('<option value="%">Any</option>');
            $('#forecastCity').prepend('<option value="%">Any</option>');
        },
        error: function(err) {
            console.log('error', err);
        }
    });
}

function setCountry() {
    COUNTRY = $('#forecastCountry').val();
    console.log(COUNTRY, ' - ', PROVINCE, ' - ', CITY);
    if(COUNTRY != '%') getOptions();
}

function setProv() {
    PROVINCE = $('#forecastProv').val();
    console.log(COUNTRY, ' - ', PROVINCE, ' - ', CITY);
    if(PROVINCE != '%') getOptions();
}

function setCity() {
    CITY = $('#forecastCity').val();
    console.log(COUNTRY, ' - ', PROVINCE, ' - ', CITY);
}

function getForecast() {
    COUNTRY = $('#forecastCountry').val();
    PROVINCE = $('#forecastProv').val();
    CITY = $('#forecastCity').val();
    console.log(COUNTRY, ' - ', PROVINCE, ' - ', CITY, ' - ');
    var search = {
        country: COUNTRY,
        province: PROVINCE,
        city: CITY,
    }
    var row = '<div class="row my-2 py-3 rounded bg-secondary">'
    var col = '<div class="col-sm-3 text-center">';
    var end = '</div>';
    $.ajax({
        url: '/se3309_Assign04/src/server/forecasts.php', // your php file
        type: 'POST', // type of the HTTP request
        data: search,
        dataType: "json",
        success: function(data){
            console.log(data);
            if(data.length > 0) {
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