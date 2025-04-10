<script setup>
import { markRaw } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const visualizerBg = `https://picsum.photos/640/425?random=${Math.floor(Math.random() * 1000)}`;
</script>

<template>
  <div class="audio">
    <div class="audio__media">
      <div class="audio__visualizer" :style="{ backgroundImage: `url(${visualizerBg})` }">
        <div class="audio__overlay"></div>
      </div>

      <div class="audio__player">
        <audio class="audio__native" controls :src="src"></audio>
      </div>
    </div>
    <div class="audio__description">
      {{ description }}
    </div>
  </div>
</template>

<style scoped>
.audio {
  border-radius: 1px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.audio:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.audio__media {
  position: relative;
  aspect-ratio: 640/425;
  width: 100%;
}

.audio__visualizer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 1;
}

.audio__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2;
}

.audio__player {
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
  z-index: 3;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 5px;
}

.audio__native {
  width: 100%;
  top: -2px;
}

.audio__description {
  color: #9ca3af;
  font-size: 0.85rem;
  margin: 0;
  padding: 10px;
  background: #fff;
}
</style>