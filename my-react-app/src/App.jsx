import React, { useState } from 'react';
import './App.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // This is where you'll add your API key during the demo
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const getWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* <div className="container"> */}
        {/* Header */}
        <div className="header">
          <h1 className="title">🌤️ Weather App</h1>
          <p className="subtitle">Get weather info for any city!</p>
        </div>

        {/* Search Section */}
        <div className="search-section">
          <div className="input-group">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="search-input"
              onKeyPress={(e) => e.key === 'Enter' && getWeather()}
            />
            <button
              onClick={getWeather}
              disabled={loading}
              className={`search-button ${loading ? 'loading' : ''}`}
            >
              {loading ? '⏳' : '🔍'}
            </button>
          {/* </div> */}
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <p>❌ {error}</p>
          </div>
        )}

        {/* Weather Display */}
        {weather && (
          <div className="weather-card">
            <div className="weather-header">
              <h2 className="location">
                {weather.name}, {weather.sys.country}
              </h2>
              <p className="description">
                {weather.weather[0].description}
              </p>
            </div>

            <div className="weather-main">
              <div className="weather-icon">
                {getWeatherIcon(weather.weather[0].main)}
              </div>
              <div className="temperature">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="feels-like">
                Feels like {Math.round(weather.main.feels_like)}°C
              </div>
            </div>

            <div className="weather-details">
              <div className="detail-item">
                <div className="detail-label">💧 Humidity</div>
                <div className="detail-value">{weather.main.humidity}%</div>
              </div>
              <div className="detail-item">
                <div className="detail-label">💨 Wind</div>
                <div className="detail-value">{weather.wind.speed} m/s</div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions for Demo */}
        {!weather && !loading && !error && (
          <div className="instructions">
            <h3>🚀 For Workshop Demo:</h3>
            <ol>
              <li>1. Sign up at openweathermap.org</li>
              <li>2. Get your free API key</li>
              <li>3. Replace 'YOUR_API_KEY_HERE' in the code</li>
              <li>4. Try searching for "Miami" or "New York"!</li>
            </ol>
          </div>
        )}
      </div>
       <div className="footer">
          <p className="subtitle">ColorStack UF 2025 Workshop 2 - lilina-cc</p>
        </div>
    </div>
  );
};

// Helper function to get weather icons
const getWeatherIcon = (weatherMain) => {
  const icons = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Smoke': '🌫️',
    'Haze': '🌫️',
    'Dust': '🌫️',
    'Fog': '🌫️',
    'Sand': '🌫️',
    'Ash': '🌫️',
    'Squall': '💨',
    'Tornado': '🌪️'
  };
  return icons[weatherMain] || '🌤️';
};

export default WeatherApp;