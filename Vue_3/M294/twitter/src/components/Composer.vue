<script setup>
import { ref } from 'vue'

const text = ref('')
</script>

<template>
  <!-- Composer -->
  <form class="composer">
    <label class="composer__prompt">Was geht?</label>
    <textarea v-model="text" maxlength="160" class="composer__textarea" placeholder="Verfasse einen Tweet..." />
    <div class="composer__actions">
      <div class="composer__stats stats">
        <span class="stats__counter">{{ text.length }}</span>
        <span class="stats__max">/ 160</span>
      </div>
      <button :disabled="text.length < 5" class="btn btn--primary">
        Tweet veröffentlichen
      </button>
    </div>
  </form>
</template>

<style>
</style>