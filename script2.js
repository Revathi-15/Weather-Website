
let cityName = document.getElementById('cityName');
let cityInput = document.getElementById('searchBar');
let searchBtn = document.getElementById('searchBtn');     
let temp = document.getElementById('temp');
let condition = document.getElementById('condition');
let windEl = document.getElementById('wind');
let humidityEl = document.getElementById('humidity');
let iconEl = document.getElementById('icon');
let pressureEl = document.getElementById('pressure');

searchBtn.addEventListener('click', function () {
    let cityName = cityInput.value;
    fetchWeather(cityName);
});

async function fetchWeather(cityName) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=93777aa63aa67084e1bd09488ec46331`);
        
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            alert('Enter a valid city name');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const { cod, main, name, weather, wind } = data;
    if (cod === 200) {
        const code = weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/wn/${code}.png`;

        cityName.textContent = name+' ⚲';
        temp.textContent = main.temp;
        condition.textContent = weather[0].main;
        windEl.textContent = wind.speed + ' km/h';
        humidityEl.textContent = main.humidity;
        iconEl.setAttribute('src', iconUrl);
        pressureEl.textContent = main.pressure +" millibar";
    } else {
        alert('Enter a valid city name');
    }
}

fetchWeather('Durgapur');
