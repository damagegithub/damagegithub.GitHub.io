const getWeatherByCoord = async (lat, lon) => {

    const response = await fetch("http://127.0.0.1:8081/weather/coordinates?lat=" + lat + "&long=" + lon, {
        "method": "GET",
    })
    var weatherInfo =  await response.json();
    if (weatherInfo.code ==200) {
        return weatherInfo;
    } else if (weatherInfo.code == 404) {
        throw 404;
    } 
}

const getWeatherByCityName = async (name) => {
    const response = await fetch("http://127.0.0.1:8081/weather/city?city=" + name, {
        "method": "GET",
    })
    var weatherInfo =  await response.json();
    if (weatherInfo.code ==200) {
        return weatherInfo;
    } else if (weatherInfo.code == 404) {
        throw 404;
    } 

}