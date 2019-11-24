let units = 'metric';   
const apiId = '8d1e9284c9373751f4e24ac5eb9993ce';
const cityInput = document.forms['city'];

cityInput.addEventListener('submit', getWeatherByCityName);

function getWeatherByCityName(e) {
    e.preventDefault();
    let miasto = document.getElementById("enterCity").value;
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${miasto}&units=${units}&appid=${apiId}`)
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                return Promise.reject(resp);
            }
        })            
        .then(resp => {
            // console.log(resp);  
            document.querySelector('.weatherinfo').innerHTML = 
            `<h3>${resp.name}, ${resp.main.temp.toFixed()} °C</h3>
            <ul>
                <li>ciśnienie: ${resp.main.pressure} hPa</li>
                <li>wilgotność: ${resp.main.humidity} %</li>
                <li>prędkość wiatru: ${resp.wind.speed} km/h</li>
                <li>kierunek wiatru: ${resp.wind.deg} °</li>
            </ul>`;
        })
        .catch(error => {
            if(error.status === 404) {
                alert(`Błąd! Nie znaleziono miasta: ${miasto}`);
            }
        })
}