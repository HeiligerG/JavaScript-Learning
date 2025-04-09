<script setup lang="ts">
import { ref } from 'vue';

const name = ref<string>('???');

const prefixes: string[] = [
  'Hype',
  'Biz',
  'Lolz',
  'Rofl',
  'Galaxy',
  'Biz',
  'Fan',
  'Buzz',
  'Real',
  'Solid',
  'Inter',
  'Active',
  'Swoosh',
];

const suffixes: string[] = [
  'park',
  'span',
  'cloud',
  'loop',
  'verse',
  'layer',
  'er',
  'r',
  'dot',
  'dock',
  'space',
  'yard',
  'scale',
  'signal',
  'press',
  'ware',
  'port',
];

const generate = (): void => {
  const randomPrefixIndex: number = Math.floor(Math.random() * prefixes.length);
  const randomPrefix: string = prefixes[randomPrefixIndex];
  
  const randomSuffixIndex: number = Math.floor(Math.random() * suffixes.length);
  const randomSuffix: string = suffixes[randomSuffixIndex];
  
  name.value = randomPrefix + randomSuffix;
};
</script>

<template>
  <div class="container">
    <h1>Startup-Name Generator</h1>
    <div class="name-display">{{ name }}</div>
    <button @click="generate">Name generieren</button>
  </div>
</template>

<style>
.container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

h1 {
  color: #333;
  margin-bottom: 30px;
}

.name-display {
  font-size: 32px;
  font-weight: bold;
  margin: 30px 0;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 5px;
  min-height: 50px;
}

button {
  background-color: #047d08;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #45a049;
}
</style>