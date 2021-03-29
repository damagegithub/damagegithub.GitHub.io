var iconDic = {
    "Clear": `<i class="fas fa-sun"></i>`,
    "Rain": `<i class="fas fa-cloud-rain"></i>`,
    "Clouds": `<i class="fas fa-cloud"></i>`,
    "Snow": `<i class="fas fa-snowflakes"></i>`,
    "Mist": `<i class="fad fa-fog"></i>`
}
var countCities = 0



var container = document.getElementsByClassName("container")[0];

const deleteBlock = (btn) => {
    var elem = btn.parentNode.parentNode.parentNode;
    var block = btn.parentNode.parentNode;
    var cityName = btn.parentNode.children[0].innerText;
    (async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8081/favourites/change`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body:`{"city":"${cityName}","del":1}`
            })
            const code = await response.json();
            if (code.code==200) {
                elem.removeChild(block);
            }
        } catch (error) {
            console.log(error);
        }
    })();

}

const addLoadingBlock = (cityName) => {
    (async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8081/favourites/change`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body:`{"city":"${cityName}","del":0}`
            })
            const code = await response.json();
            if (code.code==200) {
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
            await setCitiesWeather(cityName);
            }
        } catch (error) {
            console.log(error);
        }
    })();
   
    

}


//加载存在LocalStrorage里的信息,
const loadSavedBlock = async () => {
    var cities = new Array();
        const response = await fetch("http://127.0.0.1:8081/favourites", {
            "method": "GET",
        })
        const json = await response.json();
        for (let i = 0; i < json.length; i++) {
            cities.push(json[i].cityName)
        }
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

const getWeatherIcon = (weather) => {
    return iconDic[weather];
}

const setMainCityWeather = async () => {
    console.log("Setting Main City Info")
    mainCityBlock = document.getElementsByClassName("header")[0];
    loadingBlock = document.getElementsByClassName("loadingMainCity")[0];
    loadingBlock.style.display = "block";
    mainCityBlock.style.display = "none";

    var weatherInfo;
    try {
        console.log("trying")
        weatherInfo = await getWeatherByCoord(localLat, localLon);
        console.log(weatherInfo)
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
        console.log("weather API error")
    }
    console.log("setted MainWeatherInfo")
}

const setCitiesWeather = async (cityName) => {
    var sectionBlocks = document.getElementsByClassName("section");
    for (let i = 0; i < sectionBlocks.length; i++) {
        if (sectionBlocks[i].children[0].children[0].innerText == cityName) {
            var weatherInfo;
            try {
                weatherInfo = await getWeatherByCityName(cityName);
                console.log(weatherInfo)
            } catch (error) {
                console.log(error);
                var elem = sectionBlocks[i].parentNode;
                var block = sectionBlocks[i];
                (async () => {
                    try {
                        const response = await fetch(`http://127.0.0.1:8081/favourites/change`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json;charset=utf-8'
                            },
                            body:`{"city":"${cityName}","del":1}`
                        })
                        const code = await response.json();
                        if (code.code==200) {
                            elem.removeChild(block);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                })();
                i--;
                alert(error);
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
                console.log("weather API error")
            }
        }
    }
}

const updateCitiesWeather = async () => {
    var cities = new Array();
    const response = await fetch("http://127.0.0.1:8081/favourites", {
        "method": "GET",
    })
    const json = await response.json();
    for (let i = 0; i < json.length; i++) {
        cities.push(json[i].cityName)
    }
    const promises = cities.map(cityName => setCitiesWeather(cityName));
    for (const promise of promises) {
        await promise;
    }

}

const updateWeather = () => {
    (async () => {
        await setMainCityWeather();
    })();
    var sections = document.getElementsByClassName("section");
    let t = sections.length;
    for (let i = 0; i < t; i++) {
        sections[0].parentNode.removeChild(sections[0]);
    }
    loadSavedBlock();
    updateCitiesWeather();
}
var deleteBlockBtn = document.getElementsByClassName("deleteBlock");

for (let i = 0; i < deleteBlockBtn.length; i++) {
    deleteBlockBtn[i].setAttribute("onclick", "deleteBlock(this)");
}


var addBlockBtn = document.getElementsByClassName("fa-plus-circle")[0];
var addBlockInput = document.getElementById("addBlockInput");
addBlockBtn.setAttribute("onclick", `addLoadingBlock(document.getElementById("addBlockInput").value)`)

var updateWeatherBtns = document.getElementsByClassName("updateWeather");
for (btn of updateWeatherBtns) {
    btn.setAttribute("onclick", "updateWeather();")
}