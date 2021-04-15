var express = require('express');
var fetch = require("node-fetch");
var router = express.Router();

const getWeatherByCoord = async (lat, lon) => {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=20940a1010f61657e990376f1c7271b4", {
        "method": "GET",
    })
    const json = await response.json();
    if (json.cod == 200) {
        var weatherInfo = {
            cityName: json.name,
            weather: json.weather[0].main,
            temp: json.main.temp,
            wind: json.wind.speed + " m/s ," + json.wind.deg + " deg",
            clouds: json.clouds.all + " %",
            pressure: json.main.pressure + " 	hPa",
            humidity: json.main.humidity + " %",
            coord: "lon:" + json.coord.lon + " ,lat:" + json.coord.lat,
            code: json.cod
        };
        return weatherInfo;
    } else {

        throw 404;
    }
}
const getWeatherByCityName = async (name) => {
    const response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + name + "&units=metric&appid=20940a1010f61657e990376f1c7271b4", {
        "method": "GET",
    })
    const json = await response.json();
    if (json.cod == 200) {
        var weatherInfo = {
            cityName: json.name,
            weather: json.weather[0].main,
            temp: json.main.temp,
            wind: json.wind.speed + " m/s ," + json.wind.deg + " deg",
            clouds: json.clouds.all + " %",
            pressure: json.main.pressure + " 	hPa",
            humidity: json.main.humidity + " %",
            coord: "lon:" + json.coord.lon + " ,lat:" + json.coord.lat,
            code: json.cod
        };
        return weatherInfo;
    } else {
        throw 404;
    }
}
/* GET home page. */
router.get('/city', function (req, res) {
    var cityName = req.query.city;
    (async () => {
        try {
            res.json(await getWeatherByCityName(cityName))
        } catch (err) {
            res.status(404);
            res.send({code: 404});
        }
    })();
});
router.get('/coordinates', function (req, res) {
    var latitude = req.query.lat;
    var longitude = req.query.long;
    (async () => {
        try {
            res.json(await getWeatherByCoord(latitude, longitude))
        } catch (err) {
            res.status(404);
            res.send({
                code: 404
            });
        }
    })();
});
module.exports = router;