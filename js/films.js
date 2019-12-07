function getfilm() {
    fetch('http://www.omdbapi.com/?apikey=c091cf70')
        .then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                return Promise.reject(resp);
            }
        })            
        .then(resp => {
            console.log(resp); 
        })
}
getfilm()