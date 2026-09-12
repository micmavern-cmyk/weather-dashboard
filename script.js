// Weather Dashboard JavaScript
const API_KEY = 'YOUR_API_KEY_HERE'; // Get from https://openweathermap.org/api
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const weatherCard = document.getElementById('weatherCard');
const forecastContainer = document.getElementById('forecastContainer');
const historyContainer = document.getElementById('historyContainer');

let searchHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

// Handle Search
function handleSearch() {
    const city = searchInput.value.trim();
    if (city) {
        fetchWeather(city);
        searchInput.value = '';
    }
}

// Fetch Weather Data
async function fetchWeather(city) {
    try {
        weatherCard.innerHTML = '<div class="loading">Loading weather data...</div>';
        forecastContainer.innerHTML = '<div class="loading">Loading forecast...</div>';

        // Fetch current weather
        const weatherRes = await fetch(
            `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!weatherRes.ok) throw new Error('City not found');
        
        const weatherData = await weatherRes.json();

        // Fetch forecast
        const forecastRes = await fetch(
            `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
        );
        const forecastData = await forecastRes.json();

        // Display weather
        displayWeather(weatherData);
        displayForecast(forecastData);
        
        // Add to history
        addToHistory(city);
    } catch (error) {
        weatherCard.innerHTML = `<div class="error">⚠️ ${error.message}. Please try again.</div>`;
        forecastContainer.innerHTML = '';
    }
}

// Display Current Weather
function displayWeather(data) {
    const { name, sys, main, weather, wind, clouds } = data;
    const icon = getWeatherIcon(weather[0].main);

    weatherCard.innerHTML = `
        <div class="weather-info">
            <h2>${name}, ${sys.country}</h2>
            <p class="weather-description">${weather[0].description}</p>
            <div class="temp-main">${Math.round(main.temp)}°C</div>
            <div class="weather-details">
                <div class="detail-item">
                    <h3>Feels Like</h3>
                    <p>${Math.round(main.feels_like)}°C</p>
                </div>
                <div class="detail-item">
                    <h3>Humidity</h3>
                    <p>${main.humidity}%</p>
                </div>
                <div class="detail-item">
                    <h3>Pressure</h3>
                    <p>${main.pressure} mb</p>
                </div>
                <div class="detail-item">
                    <h3>Wind Speed</h3>
                    <p>${wind.speed} m/s</p>
                </div>
                <div class="detail-item">
                    <h3>Cloudiness</h3>
                    <p>${clouds.all}%</p>
                </div>
                <div class="detail-item">
                    <h3>Visibility</h3>
                    <p>${(data.visibility / 1000).toFixed(1)} km</p>
                </div>
            </div>
        </div>
        <div class="weather-icon">${icon}</div>
    `;
    weatherCard.classList.add('active');
}

// Display Forecast
function displayForecast(data) {
    const dailyForecasts = {};

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = item;
        }
    });

    forecastContainer.innerHTML = Object.values(dailyForecasts)
        .slice(0, 5)
        .map(day => `
            <div class="forecast-card">
                <div class="forecast-date">${new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div class="forecast-icon">${getWeatherIcon(day.weather[0].main)}</div>
                <div class="forecast-temp">${Math.round(day.main.temp)}°C</div>
                <div class="forecast-temp-range">
                    H: ${Math.round(day.main.temp_max)}° L: ${Math.round(day.main.temp_min)}°
                </div>
            </div>
        `)
        .join('');
}

// Get Weather Icon
function getWeatherIcon(condition) {
    const icons = {
        'Clear': '☀️',
        'Clouds': '☁️',
        'Rain': '🌧️',
        'Drizzle': '🌦️',
        'Thunderstorm': '⛈️',
        'Snow': '❄️',
        'Mist': '🌫️',
        'Smoke': '💨',
        'Haze': '🌫️',
        'Dust': '🌪️',
        'Fog': '🌫️',
        'Sand': '🌪️',
        'Ash': '🌋',
        'Squall': '🌪️',
        'Tornado': '🌪️'
    };
    return icons[condition] || '🌤️';
}

// Add to Search History
function addToHistory(city) {
    if (!searchHistory.includes(city)) {
        searchHistory.unshift(city);
        if (searchHistory.length > 5) {
            searchHistory.pop();
        }
        localStorage.setItem('weatherHistory', JSON.stringify(searchHistory));
    }
    displayHistory();
}

// Display Search History
function displayHistory() {
    historyContainer.innerHTML = searchHistory
        .map(city => `
            <div class="history-item" onclick="fetchWeather('${city}')">
                ${city}
            </div>
        `)
        .join('');
}

// Initialize
window.addEventListener('load', () => {
    displayHistory();
    // Load default city on page load
    if (searchHistory.length > 0) {
        fetchWeather(searchHistory[0]);
    } else {
        fetchWeather('London');
    }
});

// Handle API Key not set
if (API_KEY === 'YOUR_API_KEY_HERE') {
    weatherCard.innerHTML = `
        <div class="error">
            ⚠️ API Key not configured. Please add your OpenWeather API key to script.js
        </div>
    `;
}