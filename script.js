const apiKey = '2f1a354f2139408c33f32016b9175aa9'; // Replace with your OpenWeatherMap API key
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weatherInfo');

weatherForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const city = cityInput.value.trim();
    
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeather(weatherData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please try again.');
        }
    } else {
        alert('Please enter a city name.');
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Failed to fetch weather data');
    }
}


function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;

    weatherInfo.innerHTML = `
        <h2>${cityName}</h2>
        <p><strong>Temperature:</strong> ${temperature} &deg;C</p>
        <p><strong>Weather:</strong> ${weatherDescription}</p>
    `;
    
    weatherInfo.style.display = 'block';
}
