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
        range: RANGE
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
    console.log(COUNTRY, ' - ', PROVINCE, ' - ', CITY);
    if(COUNTRY != '%') getOptions();
}

function setProv() {
    PROVINCE = $('#selectProv').val();
    console.log(COUNTRY, ' - ', PROVINCE, ' - ', CITY);
    if(PROVINCE != '%') getOptions();
}

function setCity() {
    CITY = $('#selectCity').val();
    console.log(COUNTRY, ' - ', PROVINCE, ' - ', CITY);
}

function getHistory() {

}
