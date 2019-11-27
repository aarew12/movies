let units = 'metric';   
let lang = 'pl';

const apiId = '8d1e9284c9373751f4e24ac5eb9993ce';
const cityInput = document.forms['city'];
const moment = require('moment');

cityInput.addEventListener('submit', getWeatherByCityName);

function getWeatherByCityName(e) {
    e.preventDefault();
    let miasto = document.getElementById("enterCity").value;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${miasto}&units=${units}&appid=${apiId}&lang=${lang}`)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                return Promise.reject(resp);
            }
        })            
        .then(resp => {
            console.log(resp);  
            const sunrise = new Date(resp.sys.sunrise * 1000);
            const sunset = new Date(resp.sys.sunset * 1000);
            let weatherIcon = `<img src='http://openweathermap.org/img/wn/${resp.weather[0].icon}@2x.png' alt='Weather status'>`;
            let weatherIconCss = `http://openweathermap.org/img/wn/${resp.weather[0].icon}@2x.png`;

            document.querySelector('.weatherinfo').innerHTML = 
            `<h3>${resp.name}, ${resp.main.temp.toFixed()} °C ${weatherIcon}</h3>
            <p>${resp.weather[0].description}</p>
            <ul>
                <li>ciśnienie: ${resp.main.pressure} hPa</li>
                <li>wilgotność: ${resp.main.humidity} %</li>
                <li>prędkość wiatru: ${resp.wind.speed} m/s</li>
                <li>kierunek wiatru: ${resp.wind.deg} °</li>
                <li>wschód słońca: ${sunrise.getHours()}:${sunrise.getMinutes()}:${sunrise.getSeconds()}</li>
                <li>zachód słońca: ${sunset.getHours()}:${sunset.getMinutes()}:${sunset.getSeconds()}</li>
            </ul>`;
            
            // // Weather Icon // 
            document.querySelector('.weatherimg').style.backgroundImage = `url(${weatherIconCss})`;

        })
        .catch(error => {
            if(error.status === 404) {
                alert(`Błąd! Nie znaleziono miasta: ${miasto}`);
            }
        })
}

const data = new Date();
const data2 = moment(data).format('MMMM Do YYYY, h:mm:ss a');
document.querySelector('.top').innerHTML = `<h3>${data2}</h3>`;

setInterval(() => {
    const data = new Date();
    const data2 = moment(data).format('MMMM Do YYYY, h:mm:ss a');
    document.querySelector('.top').innerHTML = `<h3>${data2}</h3>`},1000);