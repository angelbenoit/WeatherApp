if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success, fail);
}

function success(position){
     var city;
     var temperature = 0;
     var longitude =  position.coords.longitude;
     var latitude = position.coords.latitude;
     var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
     $.getJSON(url, function(result) {
         temperature = result.main.temp;
         city = result.name;
         $('#city').html(city);
         $('#convertTemperature').html(temperature + "C");
         getIcon(result);
         checkTemperatureType(temperature);
     })
}

function fail(msg) {
    console.log("Fail");
}

function checkTemperatureType(temp){
    $(document).ready(function () {
        if(temp.indexOf('C') > -1){
            convertCelciusToFahrenheit(temp);
        }
        else{
            fahrenheitToCelcius(temp);
        }
    })

}

function convertCelciusToFahrenheit(temp){
    $(document).ready(function () {
        $('#convertTemperature').click(function () {
            var fahrenheit = (9 / 5) * temp + 32;
            $('#convertTemperature').html(fahrenheit + "F")

        });
    })
}

function fahrenheitToCelcius(temp){
    $(document).ready(function () {
        $('#convertTemperature').click(function () {
            var fahrenheit = (temp - 32) * (9/5);
            $('#convertTemperature').html(fahrenheit + "F")
        });
    })
}

function getIcon(result){
    var link = result.weather[0].icon;
    $('#icon').prepend('<img src=' +link + '>');
}

