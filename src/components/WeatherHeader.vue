<template>
  <header>
    <h1>Weather App</h1>
    <input type="text" v-model="city" @keyup.enter="searchWeather" placeholder="Enter city name">
  </header>
</template>

<script>
export default {
  data() {
    return {
      city: ''
    };
  },
  methods: {
    searchWeather() {
      this.$emit('city-searched', this.city);
    }
  }
};
</script>

<style scoped>
header {
  background: linear-gradient(135deg, #4a90e2, #50e3c2);
  color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

h1 {
  margin: 0;
  font-size: 2em;
}

input[type="text"] {
  padding: 10px;
  border: none;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
  margin-top: 10px;
}
</style>

  