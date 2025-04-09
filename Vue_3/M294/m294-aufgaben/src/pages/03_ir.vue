<script setup lang="ts">
import { ref, computed } from 'vue'

const bitcoinPrice = 50000

const inputCount = ref('')
const inputPrice = ref('')
const inputDate = ref('')

const investments = ref([
])

function add() {
  if (inputCount.value && inputPrice.value) {
    investments.value.push({
      count: parseFloat(inputCount.value),
      price: parseFloat(inputPrice.value),
      date: inputDate.value || new Date().toISOString().split('T')[0]
    })
    
    inputCount.value = ''
    inputPrice.value = ''
    inputDate.value = ''
  }
}

const account = computed(() => {
  let total = 0
  investments.value.forEach(item => {
    total += item.count
  })
  return total
})

const invested = computed(() => {
  let total = 0
  investments.value.forEach(item => {
    total += item.count * item.price
  })
  return total
})

const valueToday = computed(() => {
  return account.value * bitcoinPrice
})

const profit = computed(() => {
  return valueToday.value - invested.value
})
</script>

<template>
  <div class="investment-rechner">
    <h1>BTC-Investment-Rechner</h1>
    
    <div class="form">
      <h2>Neues Investment erfassen</h2>
      <div class="inputs">
        <div class="input-group">
          <label for="count">Anzahl BTC:</label>
          <input 
            type="number" 
            id="count" 
            v-model="inputCount" 
            step="0.001" 
            min="0"
            placeholder="z.B. 0.5"
          >
        </div>
        
        <div class="input-group">
          <label for="price">Kurs in CHF:</label>
          <input 
            type="number" 
            id="price" 
            v-model="inputPrice" 
            min="0"
            placeholder="z.B. 45000"
          >
        </div>
        
        <div class="input-group">
          <label for="date">Datum:</label>
          <input 
            type="date" 
            id="date" 
            v-model="inputDate"
          >
        </div>
        
        <button @click="add">Erfassen</button>
      </div>
    </div>
    
    <div class="info">
      <div class="balance">
        <div>Dein Kontostand</div>
        <div>{{ account.toFixed(4) }} BTC</div>
      </div>
      
      <div class="invest">
        <div>Investiert</div>
        <div>{{ invested.toFixed(2) }} CHF</div>
      </div>
      
      <div class="value-today">
        <div>Wert heute</div>
        <div>{{ valueToday.toFixed(2) }} CHF</div>
      </div>
      
      <div class="profit">
        <div>Gewinn/Verlust</div>
        <div :class="profit >= 0 ? 'positive' : 'negative'">
          {{ profit.toFixed(2) }} CHF
        </div>
      </div>
    </div>
    
    <div class="investments">
      <h2>Deine Investments</h2>
      <ul v-if="investments.length > 0">
        <li v-for="(item, index) in investments" :key="index">
          <span class="date">{{ item.date }}</span>
          <span class="count">{{ item.count }} BTC</span>
          <span class="price">zu {{ item.price }} CHF</span>
          <span class="total">= {{ (item.count * item.price).toFixed(2) }} CHF</span>
        </li>
      </ul>
      <p v-else>Noch keine Investments erfasst.</p>
    </div>
  </div>
</template>

<style>
.investment-rechner {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1, h2 {
  color: #333;
}

.form {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: flex-end;
}

.input-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
}

.info > div {
  background-color: #e9f7ef;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.info > div > div:first-child {
  font-weight: bold;
  margin-bottom: 10px;
}

.info > div > div:last-child {
  font-size: 1.2em;
}

.positive {
  color: green;
}

.negative {
  color: red;
}

.investments ul {
  list-style: none;
  padding: 0;
}

.investments li {
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.investments li:hover {
  background-color: #f9f9f9;
}

.date {
  font-weight: bold;
  min-width: 100px;
}
</style>