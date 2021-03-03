const token = 'a76d54bcbabc1f1ebc1f6eaea18f6ec7';

const city = document.getElementById('City');
const temp = document.getElementById('Temp');
const time = document.getElementById('Time');
const wind = document.getElementById('Wind');


if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const long = position.coords.longitude;
        const lat = position.coords.latitude;
        APICall(long, lat);
        
    }, () => {
        alert('Cannot work without geolocalisation');
    })
}

function APICall(long, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=en&appid=${token}`)
    .then((reponse) => {
        return reponse.json();
    })
    .then((data) => {
        console.log(data);

        city.innerText = data.timezone;
        temp.innerText = `${(data.current.temp)}°`;
        wind.innerText = `${parseInt((data.current.wind_speed)*3.6)} km/h`;

        let night;
        Math.round(new Date() / 1000) >= data.current.sunset && Math.round(new Date() / 1000) <= data.current.sunrise ? night = 1 : night = 0;
        // console.log(night);
        if (night === 1)
        {
            document.body.style.backgroundImage = "url(./Assets/IMG/night.jfif)";
        }
        else if (night === 0)
        {
            document.body.style.backgroundImage = "url(./Assets/IMG/day.jpeg)";
        }

    })
}