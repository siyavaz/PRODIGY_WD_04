const apiKey = '87348fcf89420c83d18228bf1580c8c4'; // Your OpenWeatherMap API key

document.getElementById('searchButton').addEventListener('click', () => {
    const location = document.getElementById('locationInput').value;
    fetchWeatherData(location);
});

function fetchWeatherData(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching weather data: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Log the response data to inspect it
            displayWeatherData(data);
            changeBackground(data.weather[0].main);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayErrorMessage(error.message);
        });
}

function displayWeatherData(data) {
    if (!data || !data.sys || !data.main || !data.weather || !data.wind) {
        displayErrorMessage('Incomplete data received from the weather API.');
        return;
    }

    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <p><strong>Location:</strong> ${data.name}, ${data.sys.country}</p>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <img class="weather-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon">
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
}

function changeBackground(weather) {
    const weatherClassMap = {
        Clear: 'clear',
        Clouds: 'clouds',
        Rain: 'rain',
        Snow: 'snow',
        Thunderstorm: 'thunderstorm',
        Drizzle: 'drizzle',
        Mist: 'mist'
    };

    // Remove existing weather classes from the body
    document.body.className = '';

    // Add the new weather class to the body
    if (weatherClassMap[weather]) {
        document.body.classList.add(weatherClassMap[weather]);
    }
}

function displayErrorMessage(message) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `<p style="color: red;">${message}</p>`;
}
