$(document).ready(function () {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, fail);
    }

    function success(position){
            //this gets the longitude and latitude
            var longitude =  position.coords.longitude;
            var latitude = position.coords.latitude;
            //uses latitude and longtitude and combine them with the url to get user's location
            var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + latitude + "&lon=" + longitude;
            //enter the url in the method which will give us user's weather details
            getWeather(url);

                //when user clicks weather unit
                $('#weatherType').click(function () {
                    //checks if current weather unit is default type(celsius)
                    var check = $(this).text();
                    if (check === "Cº") {
                        //if so, we convert into fahrenheit and change unit (F)
                        $(this).html("Fº");
                        $('#convertTemperature').html(fahrenheit);
                    }
                    else{
                        //otherwise, it means current unit type is fahrenheit and we will convert to celsius
                        $(this).html("Cº");
                        $('#convertTemperature').html(celsius);
                    }
                });
            }
});



function fail(msg) {
    console.log("Fail");
}


function getIcon(result){
    //gets icon from json and prepends it onto the html
    var link = result.weather[0].icon;
    $('#icon').prepend('<img src=' +link + '>');
}

function getWeather(url){
    //converts json from url and we grab the city, temperature and icon
    $.getJSON(url, function(result) {
        var city;
        //gets description
        var description = result.weather[0].description;
        //temperature rounded to one degree
        var temperature = result.main.temp.toFixed(1);
        //default temperature is in celsius
        celsius = temperature;
        //converts from celsius to fahrenheit
        fahrenheit = (1.9 * temperature) + 32;
        //grabs city name from json
        city = result.name;
        // here we add all of our data to our html according to id
        $('#city').html(city);
        $('#description').html(description);
        $('#convertTemperature').html(temperature);
        $('#weatherType').html("Cº");
        getIcon(result);
    });
}
