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
            client_id = "95e9523f3067004936d2a7e699f17a4a7eff868b9d879769765c74a54bf6a64c";
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
    
