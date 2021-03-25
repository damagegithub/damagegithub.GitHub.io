const getWeatherByCoord= async (lat, lon)=> {
    const  response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=20940a1010f61657e990376f1c7271b4", {
        "method": "GET",
    })
    try {
        const json = await response.json();
        var weatherInfo = {
            cityName: json.name,
            weather: json.weather[0].main,
            temp: json.main.temp,
            wind: json.wind.speed + " m/s ," + json.wind.deg + " deg",
            clouds: json.clouds.all+" %",
            pressure: json.main.pressure+" 	hPa",
            humidity: json.main.humidity+" %",
            coord: "lon:" + json.coord.lon + " ,lat:" + json.coord.lat,
            code:json.cod
        };
        return weatherInfo;
    } catch (err) {
        console.log(err);
    };
}
const getWeatherByCityName = async (name)=> {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=metric&appid=20940a1010f61657e990376f1c7271b4", {
        "method": "GET",
    })
    try {
        const json = await response.json();
        var weatherInfo = {
            cityName: json.name,
            weather: json.weather[0].main,
            temp: json.main.temp,
            wind: json.wind.speed + " m/s ," + json.wind.deg + " deg",
            clouds: json.clouds.all+" %",
            pressure: json.main.pressure+" 	hPa",
            humidity: json.main.humidity+" %",
            coord: "lon:" + json.coord.lon + " ,lat:" + json.coord.lat,
            code:json.cod
        };
        return weatherInfo;
    } catch (err) {
        console.log(err);
    };
}


