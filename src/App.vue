<template>
  <div id="app">
    <WeatherHeader @city-searched="fetchWeather" />
    <div class="container">
      <CurrentWeatherDisplay :weather="currentWeather" />
      <WeatherForecast :forecast="weatherForecast" />
    </div>
    <WeatherFooter />
  </div>
</template>

<script>
import WeatherHeader from './components/WeatherHeader.vue';
import CurrentWeatherDisplay from './components/CurrentWeatherDisplay.vue';
import WeatherForecast from './components/WeatherForecast.vue';
import WeatherFooter from './components/WeatherFooter.vue';
import { getCurrentWeatherByCoords, getWeatherForecastByCoords, getCoordinatesByCity } from './services/weatherService';

export default {
  components: {
    WeatherHeader,
    CurrentWeatherDisplay,
    WeatherForecast,
    WeatherFooter
  },
  data() {
    return {
      currentWeather: null,
      weatherForecast: null
    };
  },
  methods: {
    async fetchWeather(city) {
      try {
        // Get the latitude and longitude of the city
        const { lat, lon } = await getCoordinatesByCity(city);

        // Fetch the current weather using coordinates
        const weatherResponse = await getCurrentWeatherByCoords(lat, lon);
        
        // Fetch the weather forecast using coordinates
        const forecastResponse = await getWeatherForecastByCoords(lat, lon, {
          daily: [
            'temperature_2m_max', 
            'temperature_2m_min',
            'weather_code',
            'weather_description',
            // Add any other parameters you need
          ],
          timezone: 'auto' // or specify a timezone
        });

        // Update the component data with the fetched weather data
        this.currentWeather = weatherResponse.data.current_weather;
        this.weatherForecast = forecastResponse.data.daily;
        console.log('Forecast data:', this.weatherForecast); // Debugging log
      } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Failed to fetch weather data. Please try again.');
      }
    }
  }
};
</script>



<style scoped>
#app {
  font-family: 'Roboto', sans-serif;
  text-align: center;
  color: #333;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}
</style>







