let units = 'metric';   
let lang = 'pl';

const apiId = '8d1e9284c9373751f4e24ac5eb9993ce';
const cityInput = document.forms['city'];
let pogoda = '';
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
            
            pogoda = resp.weather[0].description;

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

function getfilm() {
    const humor = document.getElementById('selectMood').value;
    //const pogoda = document.getElementById('pogoda').innerText;
    console.log(humor);
    console.log(pogoda);
    let genre = 0;

    if(pogoda=='bezchmurnie'){
        if(humor=='wspanialy'){genre = 14} //fantasy
        if(humor=='znudzony'){genre = 12} //adventure
        if(humor=='smutny'){genre = 80} //crime
        if(humor=='zabawny'){genre = 35} //comedy
        if(humor=='romantyczny'){genre = 10749} //romance
    }
    else if(pogoda=='chmury'){
        if(humor=='wspanialy'){genre = 878} //scifi
        if(humor=='znudzony'){genre = 28} //action
        if(humor=='smutny'){genre = 18} //drama
        if(humor=='zabawny'){genre = 10751} //family
        if(humor=='romantyczny'){genre = 10752} //war
    }
    else if(pogoda=='deszcz'){
        genre=0
    }
    else if(pogoda=='snieg'){
        genre=0
    }
    else if(pogoda=='burza'){
        genre=0
    }

   
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=6b1cc464b3efa8bfb5d2dab11c1c9792&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}&with_original_language=en`)
   
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                return Promise.reject(resp);
            }
        })            
        .then(resp => {
            const film = Math.round(Math.random()*10);
            const title = resp.results[film].original_title;
            const description = resp.results[film].overview;
            const path = `http://image.tmdb.org/t/p/w500${resp.results[film].poster_path}`;
            document.getElementById('title').innerHTML = title;
            document.getElementById('description').innerHTML = description;
            document.getElementById('poster').innerHTML = `<div class='movieimg'><img src=${path}></img></div>`;
            console.log(resp.results[film]);
            console.log(path); 
        })
}
btn=document.getElementById('btnfilm');
btn.addEventListener('click',getfilm);


const data = new Date();
const data2 = moment(data).format('MMMM Do YYYY, h:mm:ss a');
document.querySelector('.top').innerHTML = `<h3>${data2}</h3>`;

setInterval(() => {
    const data = new Date();
    const data2 = moment(data).format('MMMM Do YYYY, h:mm:ss a');
    document.querySelector('.top').innerHTML = `<h3>${data2}</h3>`},1000);

    
    
