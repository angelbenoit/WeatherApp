if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(success, fail);
}

function success(position){
    $(document).ready(function () {
        var city;
        var temperature = 0;
        var longitude =  position.coords.longitude;
        var latitude = position.coords.latitude;

        var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
        $.getJSON(url, function(result) {
            temperature = result.main.temp.toFixed(1);
            city = result.name;
            $('#city').html(city);
            $('#convertTemperature').html(temperature);
            $('#weatherType').html("C");
            getIcon(result);
        });
        $('#weatherType').click(function () {
            checkTemperatureType(temperature);
        });
    })
}




function fail(msg) {
    console.log("Fail");
}

function checkTemperatureType(temp){
        var check = $('#weatherType').text();

        if(check === "C"){
            convertCelciusToFahrenheit(temp);

            $('#weatherType').html("F");
        }
        else{
            fahrenheitToCelcius(temp);
            $('#weatherType').html("C");
        }
}

function convertCelciusToFahrenheit(temp){
            var fahrenheit = (9 / 5) * temp + 32;
            $('#convertTemperature').html(fahrenheit.toFixed(1))
}

function fahrenheitToCelcius(temp){
            var fahrenheit = (temp - 32) * (5/9);
            $('#convertTemperature').html(fahrenheit.toFixed(1))
}

function getIcon(result){
    var link = result.weather[0].icon;
    $('#icon').prepend('<img src=' +link + '>');
}

