const token = 'a76d54bcbabc1f1ebc1f6eaea18f6ec7';

const city = document.getElementById('City');
const today = document.getElementById('Today');
const temp = document.getElementById('Temp');
const image = document.getElementById('wicon');
const time = document.getElementById('Time');
const date = document.getElementById('Date');
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
        today.innerText = "\n" + data.current.weather[0].description.charAt(0).toUpperCase() + data.current.weather[0].description.slice(1); 
        temp.innerText = ` ${(parseInt(data.current.temp))}°C`;
        let iconcode = data.current.weather[0].icon;
        console.log(iconcode)
        let iconurl = "http://openweathermap.org/img/wn/" + iconcode + "@2x.png";
        image.setAttribute('src', iconurl);
        wind.innerText = ` ${parseInt((data.current.wind_speed)*3.6)} km/h`;
        let night;
        Math.round(new Date() / 1000) >= data.current.sunset && Math.round(new Date() / 1000) <= data.current.sunrise ? night = 1 : night = 0;
        // console.log(night);
        data.current.temp = -8;
        if (night === 1)
        {
            document.body.style.backgroundImage = "url(./Assets/IMG/night.jfif)";
            if (data.current.temp < 0)
                document.body.style.backgroundImage = "url(./Assets/IMG/coldnight.jpeg)";
        }
        else if (night === 0)
        {
            document.body.style.backgroundImage = "url(./Assets/IMG/day.jpeg)";
            if (data.current.temp < 0)
                document.body.style.backgroundImage = "url(./Assets/IMG/colday.webp)";

        }
    })
}

function timeReload () {
    let event = new Date();
        time.innerText = event.toLocaleTimeString('en-US', {timeStyle: 'medium'});
        date.innerText = event.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    setTimeout(timeReload, 1000);
}

timeReload();