var iconDic = {
    "Clear": `<i class="fas fa-sun"></i>`,
    "Rain": `<i class="fas fa-cloud-rain"></i>`,
    "Clouds": `<i class="fas fa-cloud"></i>`,
    "Snow": `<i class="fas fa-snowflakes"></i>`
}

var countCities = 0
var cities = new Array();
(() => {
    //load localStorage
    if (localStorage.length == 0) {
        localStorage.cities = cities;
    }
    cities = localStorage.cities.split(",");
})();

var container = document.getElementsByClassName("container")[0];

const deleteBlock=(btn)=> {
    var elem = btn.parentNode.parentNode.parentNode;
    var block = btn.parentNode.parentNode;
    var cityName = btn.parentNode.children[0].innerText;
    console.log(cityName)
    for (let i = 0; i < cities.length; i++) {
        if (cities[i] == cityName) {
            cities.splice(i);
        }
    }
    localStorage.cities = cities;
    console.log(localStorage.cities)
    elem.removeChild(block);
}

const addLoadingBlock = (cityName)=> {
    cities.push(cityName)
    localStorage.cities = cities;
    container.innerHTML += ` <div class="section" >
    <div class="city cities">
        <div class="cityName block-inline">${cityName}
        </div>
        <div class="temp block-inline">
                    ???
                </div>
                <div class="icon block-inline">
                <i class="fas fa-question-circle"></i>
                </div>
        <div class="deleteBlock block-inline" onclick="deleteBlock(this)">
            <i class="far fa-times-circle"></i>
        </div>
    </div>
    <div class="weather loading">
        <div style="margin-top:40px;margin-bottom:30px;">LOADING</div>
        <i class="fas fa-redo-alt"></i>
    </div>
</div>`
    setCitiesWeather(cityName);

}


//加载存在LocalStrorage里的信息,
const loadLocalStorageBlock=()=> {
    for (var i = 0; i < cities.length; i++) {
        if (cities[i] != "") {
            container.innerHTML += ` <div class="section" >
            <div class="city cities">
        <div class="cityName block-inline">${cities[i]} 
        </div>
        <div class="temp block-inline">
                    ???
                </div>
                <div class="icon block-inline">
                <i class="fas fa-question-circle"></i>
                </div>
        <div class="deleteBlock block-inline" onclick="deleteBlock(this)">
            <i class="far fa-times-circle"></i>
        </div>
    </div>
    <div class="weather loading">
        <div style="margin-top:40px;margin-bottom:30px;">LOADING</div>
        <i class="fas fa-redo-alt"></i>
    </div>
</div>`
        }
    }
}

const sleep = (timeout = 2000) => new Promise(resolve => {
    setTimeout(resolve, timeout);
});

const getWeatherIcon = (weather)=>{
    return iconDic[weather];
}

const setMainCityWeather = async () => {
    mainCityBlock = document.getElementsByClassName("header")[0];
    loadingBlock = document.getElementsByClassName("loadingMainCity")[0];
    loadingBlock.style.display = "block";
    mainCityBlock.style.display = "none";

    await sleep(2000);
    var weatherInfo;
    try {
        weatherInfo = await getWeatherByCoord(localLat, localLon);
    } catch (error) {
        console.log(error);
        return;
    }
    console.log(weatherInfo.code);
    var mainCityBlock = document.getElementsByClassName("header")[0];
    if (weatherInfo.code == 200) {
        var header = document.createElement("header");
        header.innerHTML = `<div class="city mainCity">
        <div class="cityName">${weatherInfo.cityName}
        </div>
        <div class="icon">
            ${getWeatherIcon(weatherInfo.weather)}
        </div>
        <div class="temp">
            ${weatherInfo.temp} °C
        </div>
    </div>

    <div class="weather">
        <ul>
            <li class="wind weatherInfo">
                <div class="block-inline weatherInfoName">
                    <p>Ветер</p>
                </div>
                <div class="block-inline weatherInfoValue">
                    <p>${weatherInfo.wind}</p>
                </div>
            </li>
            <li class="cloud weatherInfo">
                <div class="block-inline weatherInfoName">
                    <p>облачность</p>
                </div>
                <div class="block-inline weatherInfoValue">
                    <p>${weatherInfo.clouds}</p>
                </div>
            </li>
            <li class="pressure weatherInfo">
                <div class="block-inline weatherInfoName">
                    <p>Давление</p>
                </div>
                <div class="block-inline weatherInfoValue">
                    <p>${weatherInfo.pressure}</p>
                </div>
            </li>
            <li class="humidity weatherInfo">
                <div class="block-inline weatherInfoName">
                    <p>Влажность</p>
                </div>
                <div class="block-inline weatherInfoValue">
                    <p>${weatherInfo.humidity}</p>
                </div>
            </li>
            <li class="coordinates weatherInfo">
                <div class="block-inline weatherInfoName">
                    <p>Координаты</p>
                </div>
                <div class="block-inline weatherInfoValue">
                    <p>${weatherInfo.coord}</p>
                </div>
            </li>
        </ul>
    </div>`;
        header.setAttribute("class", "header");
        mainCityBlock.replaceWith(header);
        loadingBlock.style.display = "none";
    } else {
        alert("weather API error or city name wrong")
    }
}

const setCitiesWeather = async(cityName)=> {
    var sectionBlocks = document.getElementsByClassName("section");
    for (let i = 0; i < sectionBlocks.length; i++) {
        if (sectionBlocks[i].children[0].children[0].innerText == cityName) {
            (() => {
                var date = new Date();
                console.log(date.toLocaleTimeString())
            })();
            await sleep(2000);//test async awiat
            var weatherInfo;
            try {
                weatherInfo = await getWeatherByCityName(cityName);
            } catch (error) {
                console.log(error);
                return;
            }
            if (weatherInfo.code == 200) {
                var section = document.createElement("div");
                section.setAttribute("class", "section");
                section.innerHTML = `<div class="city cities">
                <div class="cityName block-inline">
                ${weatherInfo.cityName}
                </div>
                <div class="temp block-inline">
                ${weatherInfo.temp}°C
                </div>
                <div class="icon block-inline">
                ${getWeatherIcon(weatherInfo.weather)}
                </div>
                <div class="deleteBlock block-inline" onclick="deleteBlock(this)">
                    <i class="far fa-times-circle"></i>
                </div>
            </div>
            <div class="weather ">
                <ul>
                    <li class="wind weatherInfo">
                        <div class="block-inline weatherInfoName">
                            <p>Ветер</p>
                        </div>
                        <div class="block-inline weatherInfoValue">
                            <p>${weatherInfo.wind}</p>
                        </div>
                    </li>
                    <li class="cloud weatherInfo">
                        <div class="block-inline weatherInfoName">
                            <p>облачность</p>
                        </div>
                        <div class="block-inline weatherInfoValue">
                            <p>${weatherInfo.clouds}</p>
                        </div>
                    </li>
                    <li class="pressure weatherInfo">
                        <div class="block-inline weatherInfoName">
                            <p>Давление</p>
                        </div>
                        <div class="block-inline weatherInfoValue">
                            <p>${weatherInfo.pressure}</p>
                        </div>
                    </li>
                    <li class="humidity weatherInfo">
                        <div class="block-inline weatherInfoName">
                            <p>Влажность</p>
                        </div>
                        <div class="block-inline weatherInfoValue">
                            <p>${weatherInfo.humidity}</p>
                        </div>
                    </li>
                    <li class="coordinates weatherInfo">
                        <div class="block-inline weatherInfoName">
                            <p>Координаты</p>
                        </div>
                        <div class="block-inline weatherInfoValue">
                            <p>${weatherInfo.coord}</p>
                        </div>
                    </li>
                </ul>
            </div>`;
                sectionBlocks[i].replaceWith(section)
            } else {
                alert("weather API error or city name wrong")
            }
        }
    }
}

const updateCitiesWeather = async () => {
    const promises = cities.map(cityName => setCitiesWeather(cityName));
    for (const promise of promises) {
        await promise;
    }
}

const updateWeather =()=> {
    //delete all blocks
    var sections = document.getElementsByClassName("section");
    let t = sections.length;
    for (let i = 0; i < t; i++) {
        sections[0].parentNode.removeChild(sections[0]);
    }
    (async () => {
        await setMainCityWeather();
    })();
    loadLocalStorageBlock();//add loading blocks
    updateCitiesWeather();//get weather info and add to page
}

let firstUpperCase = ([first, ...rest]) => first?.toUpperCase() + rest.join('');
var deleteBlockBtn = document.getElementsByClassName("deleteBlock");

for (let i = 0; i < deleteBlockBtn.length; i++) {
    deleteBlockBtn[i].setAttribute("onclick", "deleteBlock(this)");
}


var addBlockBtn = document.getElementsByClassName("fa-plus-circle")[0];
var addBlockInput = document.getElementById("addBlockInput");
addBlockBtn.setAttribute("onclick", `addLoadingBlock(firstUpperCase(document.getElementById("addBlockInput").value))`)

var updateWeatherBtns = document.getElementsByClassName("updateWeather");
for (btn of updateWeatherBtns) {
    btn.setAttribute("onclick", "updateWeather();")
}