<template>
  <div class="carousel-container">
    <button class="carousel-button prev" @click="scroll(-1)">&#10094;</button>
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
        </div>
      </div>
    </div>
    <button class="carousel-button next" @click="scroll(1)">&#10095;</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      forecastData: [],
      scrollAmount: 300, // Adjust scroll amount based on your design
    };
  },
  mounted() {
    this.getLocationAndFetchData();
  },
  methods: {
    async getLocationAndFetchData() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.handleGeolocationSuccess,
          this.handleGeolocationError
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    },
    
    async handleGeolocationSuccess(position) {
      const { latitude, longitude } = position.coords;
      this.fetchForecastData(latitude, longitude);
    },
    
    handleGeolocationError(error) {
      console.error('Error getting geolocation:', error);
      // You can set default coordinates if geolocation fails
      const defaultLat = 35.6895;  // Default latitude for Tokyo
      const defaultLng = 139.6917; // Default longitude for Tokyo
      this.fetchForecastData(defaultLat, defaultLng);
    },

    async fetchForecastData(latitude, longitude) {
      try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto`);
        
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);

        this.forecastData = this.processForecastData(data);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    },
    
    processForecastData(data) {
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
    
    scroll(direction) {
      const container = this.$el.querySelector('.forecast-row');
      container.scrollLeft += direction * this.scrollAmount;
    },
  },
};
</script>

<style scoped>
.carousel-container {
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  width: 100%;
}

.forecast-container {
  display: flex;
  overflow: hidden;
  width: 100%;
}

.forecast-row {
  display: flex;
  overflow-x: scroll;
  scroll-behavior: smooth;
  width: 100%;
  
  /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;  /* Internet Explorer 10+ */
}

.forecast-row::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.weather-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 300px;
  margin: 10px;
  text-align: center;
  flex: 0 0 auto; /* Prevent cards from shrinking */
}

p {
  margin: 10px 0;
}

/* Carousel buttons */
.carousel-button {
  background: rgba(0, 0, 0, 0.2);
  border: none;
  color: white;
  border-radius: 50%;
  padding: 10px;
  font-size: 24px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .weather-card {
    min-width: 200px;
    max-width: 250px;
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .weather-card {
    min-width: 150px;
    max-width: 200px;
    padding: 10px;
  }
}
</style>




















  