const token = 'a76d54bcbabc1f1ebc1f6eaea18f6ec7';

const city = document.getElementById('City');
const today = document.getElementById('Today');
const temp = document.getElementById('Temp');
const image = document.getElementById('wicon');
const time = document.getElementById('Time');
const date = document.getElementById('Date');
const wind = document.getElementById('Wind');
const day1 = document.getElementById('jour1');
const temp1 = document.getElementById('temp1');
const wicon1 = document.getElementById('wicon1');
const day2 = document.getElementById('jour2');
const temp2 = document.getElementById('temp2');
const wicon2 = document.getElementById('wicon2');
const day3 = document.getElementById('jour3');
const temp3 = document.getElementById('temp3');
const wicon3 = document.getElementById('wicon3');
const day4 = document.getElementById('jour4');
const temp4 = document.getElementById('temp4');
const wicon4 = document.getElementById('wicon4');
const day5 = document.getElementById('jour5');
const temp5 = document.getElementById('temp5');
const wicon5 = document.getElementById('wicon5');


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
        let iconurl = "./Assets/IMG/icons/" + iconcode + ".svg";
        image.setAttribute('src', iconurl);
        wind.innerText = ` ${parseInt((data.current.wind_speed)*3.6)} km/h`;

        let night;
        Math.round(new Date() / 1000) >= data.current.sunset && Math.round(new Date() / 1000) <= data.current.sunrise ? night = 1 : night = 0;
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

    const currentDay = new Date();
    const day1 = new Date(currentDay);
    day1.setDate(day1.getDate() +1);
    jour1.innerText = day1.toLocaleDateString('en-US', { weekday: 'long'});
    temp1.innerText = data.daily[0].weather[0].description.charAt(0).toUpperCase() + data.daily[0].weather[0].description.slice(1);
    let iconcode1 = data.daily[0].weather[0].icon;
    let iconurl1 = "./Assets/IMG/icons/" + iconcode1 + ".svg";
    wicon1.setAttribute('src', iconurl1);

    const day2 = new Date(currentDay);
    day2.setDate(day1.getDate() + 1);
    jour2.innerText = day2.toLocaleDateString('en-US', { weekday: 'long'});
    temp2.innerText = data.daily[1].weather[0].description.charAt(0).toUpperCase() + data.daily[1].weather[0].description.slice(1);
    let iconcode2 = data.daily[1].weather[0].icon;
    let iconurl2 = "./Assets/IMG/icons/" + iconcode2 + ".svg";
    wicon2.setAttribute('src', iconurl2);

    const day3 = new Date(currentDay);
    day3.setDate(day1.getDate() + 2);
    jour3.innerText = day3.toLocaleDateString('en-US', { weekday: 'long'});
    temp3.innerText = data.daily[2].weather[0].description.charAt(0).toUpperCase() + data.daily[2].weather[0].description.slice(1);
    let iconcode3 = data.daily[2].weather[0].icon;
    let iconurl3 = "./Assets/IMG/icons/" + iconcode3 + ".svg";
    wicon3.setAttribute('src', iconurl3);

    const day4 = new Date(currentDay);
    day4.setDate(day1.getDate() + 3);
    jour4.innerText = day4.toLocaleDateString('en-US', { weekday: 'long'});
    temp4.innerText = data.daily[3].weather[0].description.charAt(0).toUpperCase() + data.daily[3].weather[0].description.slice(1);
    let iconcode4 = data.daily[3].weather[0].icon;
    let iconurl4 = "./Assets/IMG/icons/" + iconcode4 + ".svg";
    wicon4.setAttribute('src', iconurl4);

    const day5 = new Date(currentDay);
    day5.setDate(day1.getDate() + 4);
    jour5.innerText = day5.toLocaleDateString('en-US', { weekday: 'long'});
    temp5.innerText = data.daily[3].weather[0].description.charAt(0).toUpperCase() + data.daily[3].weather[0].description.slice(1);
    let iconcode5 = data.daily[4].weather[0].icon;
    let iconurl5 = "./Assets/IMG/icons/" + iconcode5 + ".svg";
    wicon5.setAttribute('src', iconurl5);

    timeReload();
        
    })
}

function timeReload () {
    let event = new Date();
        time.innerText = event.toLocaleTimeString('en-US', {timeStyle: 'medium'});
        date.innerText = event.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    setTimeout(timeReload, 1000);
}

