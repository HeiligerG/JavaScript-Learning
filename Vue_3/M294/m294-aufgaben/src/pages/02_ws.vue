<script setup lang="ts">
import { ref, computed } from 'vue';

const celsius = ref<number>(20);

const change = (amount: number): void => {
  celsius.value += amount;
};

const fahrenheit = computed<number>(() => {
  return (celsius.value * 1.8) + 32;
});

const kelvin = computed<number>(() => {
  return celsius.value + 273.15;
});

const isFreezing = computed<boolean>(() => {
  return celsius.value < 0;
});
</script>

<template>
  <div class="weather-station">
    <h1>Wetterstation</h1>
    
    <div class="temperature-display">
      <div class="temperature-row">
        <span class="label">Temperatur (Celsius):</span>
        <span class="value">{{ celsius }}°C</span>
      </div>
      
      <div class="temperature-row">
        <span class="label">Temperatur (Fahrenheit):</span>
        <span class="value">{{ fahrenheit.toFixed(2) }}°F</span>
      </div>
      
      <div class="temperature-row">
        <span class="label">Temperatur (Kelvin):</span>
        <span class="value">{{ kelvin.toFixed(2) }}K</span>
      </div>
      
      <div class="temperature-row">
        <span class="label">Gefrierpunkt unterschritten:</span>
        <span class="value">{{ isFreezing ? 'Ja' : 'Nein' }}</span>
      </div>
    </div>
    
    <div class="controls">
      <button @click="change(1)" class="btn increase">+1°C</button>
      <button @click="change(-1)" class="btn decrease">-1°C</button>
    </div>
  </div>
</template>

<style scoped>
.weather-station {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.temperature-display {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.temperature-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #ddd;
}

.temperature-row:last-child {
  border-bottom: none;
}

.label {
  font-weight: bold;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: white;
}

.increase {
  background-color: #4CAF50;
}

.increase:hover {
  background-color: #45a049;
}

.decrease {
  background-color: #f44336;
}

.decrease:hover {
  background-color: #d32f2f;
}
</style>