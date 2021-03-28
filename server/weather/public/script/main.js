//业务逻辑:
//1.首先询问定位权限
//2.加载本地缓存信息
//3.更新主城市信息
//4.更新选择的城市信息


var mainCityLoaded = false
var positionPremission = -1

const options = {
    enableHighAccuracy: true,
    timeout: 5 * 1000,
    maximumAge: 0
}
//moscow
var localLat = 55.7558
var localLon = 37.6178

const handleSuccess = data => {
    const {
        coords,
        timestamp // 成功获取位置信息时的时间戳
    } = data
    const {
        accuracy,
        altitude,
        altitudeAccuracy,
        heading,
        latitude,
        longitude,
        speed
    } = coords
    localLat = latitude
    localLon = longitude
    console.log("position loaded");
    //3.更新主城市信息
    (async () =>{
        await setMainCityWeather();
    })();

}
const handleError = error => {
    console.log(error);
    (async () =>{
        await setMainCityWeather();
    })();
}
//1.首先询问定位权限
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, options)
} else {
    alert('Geolocation is not supported in your browser')
}
//2.加载本地缓存信息
loadSavedBlock();
//4.更新选择的城市信息
updateCitiesWeather();






