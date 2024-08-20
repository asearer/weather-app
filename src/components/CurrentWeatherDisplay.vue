<template>
  <div class="weather-card" v-if="weather">
    <h2>Current Weather</h2>
    <div class="weather-icon">
      <i :class="iconClass"></i>
    </div>
    <p><strong>Temperature:</strong> {{ weather.temperature }}°C</p>
    <p><strong>Wind Speed:</strong> {{ weather.windspeed }} km/h</p>
    <p><strong>Wind Direction:</strong> {{ weather.winddirection }}°</p>
  </div>
  <div v-else>
    <p>Loading weather data...</p>
  </div>
</template>

<script>
export default {
  props: ['weather'],
  computed: {
    iconClass() {
      if (!this.weather || !this.weather.condition) return '';

      // Map weather conditions to Weather Icons classes
      switch (this.weather.condition.toLowerCase()) {
        case 'clear':
        case 'sunny':
          return 'wi wi-day-sunny';
        case 'cloudy':
        case 'partly cloudy':
          return 'wi wi-cloudy';
        case 'rain':
        case 'showers':
          return 'wi wi-rain';
        case 'snow':
          return 'wi wi-snow';
        case 'storm':
        case 'thunderstorm':
          return 'wi wi-thunderstorm';
        default:
          return 'wi wi-na'; // Default icon for unknown conditions
      }
    }
  }
};
</script>

<style scoped>
.weather-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  padding: 20px;
  max-width: 400px;
  text-align: center;
}

.weather-icon {
  font-size: 3em; /* Adjust size as needed */
  margin-bottom: 10px;
}

p {
  margin: 10px 0;
}
</style>







  