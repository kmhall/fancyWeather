        //Initial Load
        window.onload = function initialLoad() {
            currentLocation = {
                city:"",
                country:""
            };
            //Response that incldues the location of the user's device
            $.get("http://ipinfo.io", function (response) {
                currentLocation.city = response.city;
                currentLocation.country = response.country;
                console.log(currentLocation);
    
                //Initial api call to get the local weather.
                $.get(`/api/weather?loc=${currentLocation.city} ${currentLocation.country}`, function (data) {
    
                    //Populate the page with weather information here 
                    //*****
                    var weatherInfo = data[0];
                    console.log(weatherInfo);


                    if (skytext === "")


                    $("#status").html(weatherInfo.current.skytext);
                    $("#city").html(weatherInfo.location.name);
                    
                    $("#temperature").html(weatherInfo.current.temperature);
                    $("<span>").html(`&deg;`).appendTo($("#temperature"))

                    $("#feels-like").html(`${weatherInfo.current.feelslike}&deg;`);
                    $("#wind").html(weatherInfo.current.windspeed);
                    $("#humidity").html(`${weatherInfo.current.temperature}&percnt;`);



                    //*****
                    
                    //Use the weather type to query an artsy image from unsplash
                    var weatherType = data[0].current.skytext
                    weatherType = weatherType.replace(/\s+/g, '-');
                    console.log(weatherType);
                     getWeatherPhoto(weatherType);
                });
    
            }, "jsonp");
        }
    
        function getWeatherPhoto(weatherType) {
            if(weatherType == "T-Storms"){
                weatherType= "thunderstorm"
            }
            client_id = "8bfc6dcba2eee8b7cc53b56bf1013b34d92fa8909f414eda9ea9c57dec0cba5f";
            $.get(`https://api.unsplash.com/photos/random?orientation=landscape&per_page=1&query=weather,${weatherType}&client_id=${client_id}`, function (data) {
                $()
                console.log(data.urls.regular)
                $("#weatherPhoto").attr('src',data.urls.regular);
            });
        }
    
    
    
        function updateWeather() {
            var loc =  $("#loc").val();
            console.log(loc)
    
            $.get(`/api/weather?loc=${loc}`, function (data) {
                //Populate the page with weather information
                console.log(data[0]);
            });
        }
    
