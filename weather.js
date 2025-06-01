// Weather and Geolocation
function fetchWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
  
        const apiKey = 'YOUR_API_KEY';  // Get an API key from OpenWeatherMap
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            const weather = data.weather[0].description;
            const temperature = data.main.temp;
            document.getElementById('weather').textContent = `Weather: ${weather}, Temperature: ${temperature}°C`;
          })
          .catch(error => console.log('Error fetching weather:', error));
      });
    } else {
      document.getElementById('weather').textContent = 'Geolocation not available';
    }
  }
  fetchWeather();
  