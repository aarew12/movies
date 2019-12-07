const pogoda = require('./bundle.js')

function getfilm() {
    const humor = document.getElementById('selectMood').value;
    //const pogoda = document.getElementById('pogoda').innerText;
    console.log(humor);
    console.log(pogoda);
    const genre = 28;
   
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
            document.getElementById('title').innerHTML = title;
            document.getElementById('description').innerHTML = description;
            console.log(film);
            console.log(document.getElementById('selectMood').value); 
        })
}
btn=document.getElementById('btnfilm');
btn.addEventListener('click',getfilm);