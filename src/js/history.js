var COUNTRY = '%';
var PROVINCE = '%';
var CITY = '%';
var RANGE = '%';

$(document).ready(function () {
    getOptions();
});

function getOptions(argument) {
    var search = {
        country: COUNTRY,
        province: PROVINCE,
        city: CITY,
        range: 'filter'
    }
    $.ajax({
        url: '/se3309_Assign04/src/server/history.php', // your php file
        type: 'POST', // type of the HTTP request
        data: search,
        dataType: "json",
        success: function(data){
            console.log(data);
            $('#selectCountry').html('');
            $('#selectProv').html('');
            $('#selectCity').html('');
            $.each(data.countries, function(){
                $('#selectCountry')
                    .append('<option value="'+this.country+'">' + this.country + '</option>');
            });
            $.each(data.provinces, function(){
                $('#selectProv')
                    .append('<option value="'+this.province+'">' + this.province + '</option>');
            });
            $.each(data.cities, function(){
                $('#selectCity')
                    .append('<option value="'+this.city+'">' + this.city + '</option>');
            });
            $('#selectCountry').prepend('<option value="%">Any</option>');
            $('#selectProv').prepend('<option value="%">Any</option>');
            $('#selectCity').prepend('<option value="%">Any</option>');
        },
        error: function(err) {
            console.log('error', err);
        }
    });
}

function setCountry() {
    COUNTRY = $('#selectCountry').val();
    console.log(COUNTRY, ' - ', PROVINCE, ' - ', CITY, ' - ', RANGE);
    if(COUNTRY != '%') getOptions();
}

function setProv() {
    PROVINCE = $('#selectProv').val();
    console.log(COUNTRY, ' - ', PROVINCE, ' - ', CITY, ' - ', RANGE);
    if(PROVINCE != '%') getOptions();
}

function setCity() {
    CITY = $('#selectCity').val();
    console.log(COUNTRY, ' - ', PROVINCE, ' - ', CITY, ' - ', RANGE);
}

function getHistory() {
    COUNTRY = $('#selectCountry').val();
    PROVINCE = $('#selectProv').val();
    CITY = $('#selectCity').val();
    RANGE = $('#selectRange').val();
    console.log(COUNTRY, ' - ', PROVINCE, ' - ', CITY, ' - ', RANGE);
    var search = {
        country: COUNTRY,
        province: PROVINCE,
        city: CITY,
        range: RANGE
    }
    var row = '<div class="row my-2 py-3 rounded bg-secondary">'
    var col = '<div class="col-sm-2 text-center">';
    var end = '</div>';
    $.ajax({
        url: '/se3309_Assign04/src/server/history.php', // your php file
        type: 'POST', // type of the HTTP request
        data: search,
        dataType: "json",
        success: function (data) {
            console.log(data);
            if (data.length > 0) {
                $('#noresults').css('display', 'none');
                $('#searchResults').html('');
                $.each(data, function () {
                    var date = col + this.date + end;
                    var loc = col + this.country + ", " + this.province + ", " + this.city + end;
                    var high = col + "<b>High:</b> " + this.high + end;
                    var low = col + "<b>Low:</b> " + this.low + end;
                    var precipT = col + "<b>Precipitation:</b> " + this.precType + end;
                    var precipA = col + "<b>Precipitation:</b> " + this.precAmt + "mm" + end;
                    $('#searchResults')
                        .append(row + date + loc + high + low + precipT + precipA + end);
                    });
            }
            else {
                $('#noresults').css('display', 'block');
                $('#searchResults').html('');
            }
        },
        error: function (err) {
            console.log('error', err);
        }
    });
}
