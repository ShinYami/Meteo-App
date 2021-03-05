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
        image.setAttribute('src', "./Assets/IMG/icons/" + data.current.weather[0].icon + ".svg");
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

    let day1 = new Date();
    day1.setDate(day1.getDate() + 1);
    jour1.innerText = day1.toLocaleDateString('en-US', { weekday: 'long'}) + ": \n" + data.daily[0].weather[0].description.charAt(0).toUpperCase() + data.daily[0].weather[0].description.slice(1); 
    wicon1.setAttribute('src', "./Assets/IMG/icons/" + data.daily[0].weather[0].icon + ".svg");
    temp1.innerText = ` ${(parseInt(data.daily[0].temp.day))}°C`;

    let day2 = new Date();
    day2.setDate(day2.getDate() + 2);
    jour2.innerText = day2.toLocaleDateString('en-US', { weekday: 'long'}) + ": \n" + data.daily[1].weather[0].description.charAt(0).toUpperCase() + data.daily[1].weather[0].description.slice(1);
    wicon2.setAttribute('src', "./Assets/IMG/icons/" + data.daily[1].weather[0].icon + ".svg");
    temp2.innerText = ` ${(parseInt(data.daily[1].temp.day))}°C`;

    let day3 = new Date();
    day3.setDate(day3.getDate() + 3);
    jour3.innerText = day3.toLocaleDateString('en-US', { weekday: 'long'}) + ": \n" + data.daily[2].weather[0].description.charAt(0).toUpperCase() + data.daily[2].weather[0].description.slice(1);
    wicon3.setAttribute('src', "./Assets/IMG/icons/" + data.daily[2].weather[0].icon + ".svg");
    temp3.innerText = ` ${(parseInt(data.daily[2].temp.day))}°C`;

    let day4 = new Date();
    day4.setDate(day4.getDate() + 4);
    jour4.innerText = day4.toLocaleDateString('en-US', { weekday: 'long'}) + ": \n" + data.daily[3].weather[0].description.charAt(0).toUpperCase() + data.daily[3].weather[0].description.slice(1);
    wicon4.setAttribute('src', "./Assets/IMG/icons/" + data.daily[3].weather[0].icon + ".svg");
    temp4.innerText = ` ${(parseInt(data.daily[3].temp.day))}°C`;

    let day5 = new Date();
    day5.setDate(day5.getDate() + 5);
    jour5.innerText = day5.toLocaleDateString('en-US', { weekday: 'long'}) + ": \n" + data.daily[3].weather[0].description.charAt(0).toUpperCase() + data.daily[3].weather[0].description.slice(1); 
    wicon5.setAttribute('src', "./Assets/IMG/icons/" + data.daily[4].weather[0].icon + ".svg");
    temp5.innerText = ` ${(parseInt(data.daily[4].temp.day))}°C`;

    timeReload();
        
    })
}

let timeReload = () => {
    let event = new Date();
        time.innerText = event.toLocaleTimeString('en-US', {timeStyle: 'medium'});
        date.innerText = event.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    setTimeout(timeReload, 1000);
}