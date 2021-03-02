const token = 'a76d54bcbabc1f1ebc1f6eaea18f6ec7';

const city = document.getElementById('City');
const temp = document.getElementById('Temp');
const time = document.getElementById('Time');


if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        APICall(long, lat);
        prettyDate2();
    }, () => {
        alert('Cannot work without geolocalisation');
    })
}

function APICall(long, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${token}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        console.log(data);
        
        city.innerText = data.timezone;
        temp.innerText = `${(data.current.temp)}°`;

    
    })
}

function prettyDate2(time){
    let date = new Date(parseInt(time));
    let localeSpecificTime = date.toLocaleTimeString();
    time.innerText = localeSpecificTime;
    return localeSpecificTime.replace(/:\d+ /, ' ');
}