import axios from 'axios';

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// Method to get current weather by geographic coordinates (latitude & longitude)
export const getCurrentWeatherByCoords = (lat, lon) => {
  return axios.get(BASE_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      current_weather: true
    }
  });
};

// Method to get weather forecast by geographic coordinates (latitude & longitude)
export const getWeatherForecastByCoords = (lat, lon) => {
  return axios.get(BASE_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum',
      timezone: 'auto'
    }
  });
};

// Convert city names to geographic coordinates
export const getCoordinatesByCity = async (city) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: city,
        format: 'json',
        limit: 1
      }
    });

    if (response.data.length === 0) {
      throw new Error('City not found');
    }

    const { lat, lon } = response.data[0];
    return { lat, lon };
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
};



