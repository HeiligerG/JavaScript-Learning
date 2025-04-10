<script setup>
import { markRaw } from 'vue';

defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});
</script>

<template>
    <section class="gallery">
      <h2 class="gallery__title">
        {{ title }}
      </h2>
      <p class="gallery__description">
        {{ description }}
      </p>
      <div class="gallery__images">
        <slot />
      </div>
    </section>
</template>

<style scoped>
.gallery {
  margin-bottom: 40px;
  padding: 0 20px;
}

.gallery__title {
  font-weight: bold;
  font-size: 2rem;
  margin: 1rem 0;
  padding: 0;
}

.gallery__description {
  margin: 0 0 1.5rem 0;
  padding: 0;
  font-size: 1rem;
  color: #555;
}

.gallery__images {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1.5rem;
  margin: 1rem 0;
}
</style>