<template>
  <div class="weather-card" v-if="weather">
    <h2>Current Weather</h2>
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
  props: ['weather']
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

p {
  margin: 10px 0;
}
</style>


  