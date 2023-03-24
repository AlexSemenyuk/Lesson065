'use strict';


const weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID=7b5cbb6bb21d0fc862c3b47a3b967ddf&lat=48.28&lon=35.1&units=metric';

function currentWeatherParameters (lat, lon) {
        const request = new XMLHttpRequest();
        // console.log(weatherUrl.indexOf("lat"));
        // console.log(weatherUrl.indexOf("lon"));
        const url = weatherUrl.replace("48.28", lat).replace("35.1", lon);
        console.log(url);
        // const urlNeed = weatherUrl;
        request.open("GET", url);
        request.addEventListener("readystatechange", (e) => {
                if (request.readyState === request.DONE && request.status === 200) {
                        // console.log(xhr.responseText);
                        const jsonNeed = JSON.parse(request.responseText);
                        console.dir(jsonNeed);
                        showWeather(jsonNeed);
                }
        });
        request.send();

}

// Погода в Киеве
document.querySelector('.kv').addEventListener('click', () => {
    const latitude = 50.433;
    const longitude = 30.517;

    // const latitude = 41.9;       // Рим
    // const longitude = 12.5;       // Рим
    currentWeatherParameters(latitude, longitude);
});

// Погода в Днепре
document.querySelector('.dn').addEventListener('click', () => {
    const latitude = 48.452;
    const longitude = 35.046;
    currentWeatherParameters(latitude, longitude);
});

// Погода текущему положению
document.querySelector('.cur-pos').addEventListener('click', () => {
        navigator.geolocation.getCurrentPosition( (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                // console.log(position);
                console.log('latitude: ' + latitude + ', longitude: ' + longitude);
                currentWeatherParameters(latitude, longitude);
        }, err => {
                // console.error(err);
        });
});


function showWeather (weatherObj) {
                // const classTBody = city + "-tbody";
                // console.log(classTBody);
                // const tbody = document.querySelector(`.${classTBody}`);
                const tbody = document.querySelector(`.tbody`);
                // tbody.innerHTML = '';
                const tr = document.createElement('tr');
                const city = weatherObj.name;
                addTextValue(city, tr);

                const outdoor = weatherObj.weather[0].description;
                const srcTemplate = "https://openweathermap.org/img/wn/10d@2x.png";
                const urlIcon = srcTemplate.replace("10d", weatherObj.weather[0].icon);
                console.log(urlIcon);
                addImgValue(urlIcon, tr);

                const temperature = weatherObj.main.temp;
                addTextValue(temperature, tr);
                const feelsLike = weatherObj.main.feels_like;
                addTextValue(feelsLike, tr);
                const pressure = weatherObj.main.pressure;
                addTextValue(pressure, tr);
                const humidity = weatherObj.main.humidity;
                addTextValue(humidity, tr);
                const speed = weatherObj.wind.speed;

                addTextValue(speed, tr);
                // const direction = weatherObj.wind.direction;
                // addTextValue(speed + ' ' + direction, tr);
                const visibility = +weatherObj.visibility / 1000;
                addTextValue(visibility, tr);
                tbody.append(tr);
}


function addTextValue(text, el) {
        const td = document.createElement('td');
        td.scope = "row";
        td.append(text);
        el.append(td);
        // return td;
}

// Передается ссылка на фото, на основе которой формируется блок figure с img
function addImgValue(url, el) {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.alt = '';
        img.src = url;
        // img.width = "50px";
        figure.append(img);
        const td = document.createElement('td');
        td.append(figure);
        el.append(td);
        // return figure;
}
