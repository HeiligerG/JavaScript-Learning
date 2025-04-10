<script setup>
import { markRaw } from 'vue';

defineProps({
    src: {
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
    <div class="image">
        <img class="image__img" :src="src" alt="" />
        <p class="image__description">
            {{ description }}
        </p>
    </div>
</template>

<style scoped>
.image {
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.image__img {
  aspect-ratio: 640/425;
  width: 100%;
  height: auto;
  object-fit: cover;
  display: block;
}

.image__description {
  color: #9ca3af;
  font-size: .85rem;
  margin: 0;
  padding: 10px;
  background: #fff;
}
</style>