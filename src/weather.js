const weather = document.querySelector(".js-weather");

const API_KEY ="6a9504cca93c6221e693fc328eefee29";
const COORDS = 'coords';

function getWeather(lat,lng){
fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`).then(function(response){return response.json();}).then(function(json){
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerHTML = `${temperature}°C @ ${place}`;
});
}

function saveCoords(coordsObj){
localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
   const latitude = position.coords.latitude;
   const longitude = position.coords.longitude;
   const coordsObj = {
       latitude,
       longitude
   }
   saveCoords(coordsObj);
   getWeather(latitude,longitude);
}

function handleGeoErroor(){
    console.log("cant access");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoErroor)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if  (loadedCoords === null){
        askForCoords();
    } else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
        //getWeather
    }
}


function init() {
    loadCoords();

}

init();