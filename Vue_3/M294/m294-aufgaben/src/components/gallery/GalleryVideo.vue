<script setup>
defineProps({
    src: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: 'Video'
    }
});
</script>

<template>
    <div class="video">
        <iframe class="video__iframe" width="640" height="425" 
            :src="src" 
            :title="title" 
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen>
        </iframe>
        <div class="video__description">
            {{ description }}
        </div>
    </div>
</template>

<style scoped>
.video {
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.video:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.video__iframe {
  aspect-ratio: 640/425;
  width: 100%;
  height: auto;
  border: none;
  display: block;
}

.video__description {
  color: #9ca3af;
  font-size: .85rem;
  margin: 0;
  padding: 10px;
  background: #fff;
}
</style>