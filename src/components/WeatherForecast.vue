<template>
  <div class="forecast-container">
    <div v-if="forecastData.length" class="forecast-row">
      
      <div v-for="(item, index) in forecastData" :key="index" class="weather-card">
        <p>
          <strong>Date:</strong> {{ item.date || 'N/A' }}
        </p>
        <p>
          <strong>Max Temperature:</strong> {{ item.temperature_max !== 'N/A' ? item.temperature_max + ' °C' : 'N/A' }}
        </p>
        <p>
          <strong>Min Temperature:</strong> {{ item.temperature_min !== 'N/A' ? item.temperature_min + ' °C' : 'N/A' }}
        </p>
        <p>
          <strong>Precipitation:</strong> {{ item.precipitation !== 'N/A' ? item.precipitation + ' mm' : 'N/A' }}
        </p>
        <!-- Add other weather variables here with similar fallbacks -->
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      forecastData: [], // Initialize as an empty array
    };
  },
  mounted() {
    this.fetchForecastData();
  },
  methods: {
    async fetchForecastData() {
      try {
        // Update with the correct URL and query parameters for a 7-day forecast
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia/Tokyo');
        
        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        // Read response as text
        const text = await response.text();
        console.log('Response text:', text); // Debugging output

        // Parse response text to JSON
        if (text) {
          const data = JSON.parse(text);
          this.forecastData = this.processForecastData(data);
        } else {
          console.warn('Received empty response');
        }
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    },
    
    processForecastData(data) {
      // Ensure data structure matches the API response
      if (data && data.daily && Array.isArray(data.daily.time)) {
        return data.daily.time.map((date, index) => ({
          date: date || 'N/A',
          temperature_max: data.daily.temperature_2m_max ? data.daily.temperature_2m_max[index] : 'N/A',
          temperature_min: data.daily.temperature_2m_min ? data.daily.temperature_2m_min[index] : 'N/A',
          precipitation: data.daily.precipitation_sum ? data.daily.precipitation_sum[index] : 'N/A',
        }));
      }
      return [];
    },
  },
};
</script>

<style scoped>
.forecast-container {
  display: flex;
  flex-wrap: nowrap; /* Prevent wrapping to the next line */
  overflow-x: auto; /* Allow horizontal scrolling */
}

.forecast-row {
  display: flex;
}

.weather-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 300px; /* Adjust width as needed */
  margin: 10px; /* Space between cards */
  text-align: center;
}

p {
  margin: 10px 0;
}
</style>














  