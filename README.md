# ⛅ Weather Dashboard

A modern, responsive weather dashboard that fetches real-time weather data from the OpenWeather API. Get current weather conditions, a 5-day forecast, and manage your search history all in one place!

## 🌟 Features

- **Current Weather Display**: Real-time temperature, feels like, humidity, pressure, wind speed, and more
- **5-Day Forecast**: Extended weather predictions for planning ahead
- **Search History**: Automatically saves your last 5 searched cities
- **Responsive Design**: Beautiful UI that works on desktop, tablet, and mobile
- **Weather Icons**: Visual representations of weather conditions with emojis
- **Local Storage**: Persists search history across browser sessions
- **Error Handling**: User-friendly error messages for invalid cities

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Free API key from [OpenWeather](https://openweathermap.org/api)

### Installation

1. **Clone or fork this repository**
   ```bash
   git clone https://github.com/micmavern-cmyk/weather-dashboard.git
   cd weather-dashboard
   ```

2. **Get your API Key**
   - Visit [OpenWeather API](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate an API key from your dashboard

3. **Configure the API Key**
   - Open `script.js`
   - Replace `YOUR_API_KEY_HERE` with your actual API key:
     ```javascript
     const API_KEY = 'your_actual_api_key_here';
     ```

4. **Open in Browser**
   - Simply open `index.html` in your web browser
   - Or use a local server (recommended):
     ```bash
     python -m http.server 8000
     # Then visit http://localhost:8000
     ```

## 📖 Usage

1. **Search for a City**: Type a city name in the search box and press Enter or click the search button
2. **View Weather**: Current conditions display with detailed metrics
3. **Check Forecast**: See the 5-day forecast below current weather
4. **Click History**: Click any city in the search history to view its weather again

## 🎨 Technologies Used

- **HTML5**: Semantic markup for structure
- **CSS3**: Modern styling with gradients, flexbox, and grid
- **JavaScript (ES6+)**: Dynamic functionality and API integration
- **OpenWeather API**: Real-time weather data
- **Font Awesome**: Weather and UI icons
- **LocalStorage API**: Client-side data persistence

## 📁 Project Structure

```
weather-dashboard/
├── index.html      # Main HTML file
├── styles.css      # All styling
├── script.js       # JavaScript logic and API calls
├── README.md       # This file
└── LICENSE         # MIT License
```

## 🔧 Configuration

### API Key Setup

The application requires an OpenWeather API key. You can get one for free:

1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Create a free account
3. Navigate to your API keys section
4. Copy the default API key
5. Paste it in `script.js` (line 2)

### Customization

**Change Units (Celsius to Fahrenheit)**:
```javascript
// In script.js, change 'metric' to 'imperial'
const weatherRes = await fetch(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=imperial`
);
```

**Change Default City**:
```javascript
// In script.js, change 'London' to your preferred city
fetchWeather('YourCity');
```

## 📊 Weather Data Displayed

**Current Weather**:
- Temperature and "feels like" temperature
- Weather description
- Humidity percentage
- Atmospheric pressure
- Wind speed
- Cloud coverage
- Visibility

**5-Day Forecast**:
- Date and day of week
- Weather condition icon
- High and low temperatures

## 🌐 Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE11: ⚠️ Limited support (some CSS features may not work)

## 🐛 Troubleshooting

### "City not found" Error
- Ensure you've entered a valid city name
- Try searching with country code (e.g., "London, UK")
- Check your internet connection

### No Weather Data Displays
- Verify your API key is correctly configured in `script.js`
- Check if your API key has expired
- Ensure you have internet connectivity

### Search History Not Saving
- Check if LocalStorage is enabled in your browser
- Clear browser cache and try again

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Fork the repository
- Create a feature branch (`git checkout -b feature/amazing-feature`)
- Commit your changes (`git commit -m 'Add amazing feature'`)
- Push to the branch (`git push origin feature/amazing-feature`)
- Open a Pull Request

## 🙏 Acknowledgments

- [OpenWeather API](https://openweathermap.org/) for providing weather data
- [Font Awesome](https://fontawesome.com/) for icons
- [GitHub](https://github.com) for hosting

## 📧 Contact

Have questions or suggestions? Feel free to open an issue or reach out!

---

**Made with ❤️ by [micmavern-cmyk](https://github.com/micmavern-cmyk)**
