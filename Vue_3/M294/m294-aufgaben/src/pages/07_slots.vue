<script setup>
import { ref, markRaw } from 'vue'
import Gallery from '../components/gallery/Gallery.vue';
import GalleryImage from '../components/gallery/GalleryImage.vue';
import GalleryVideo from '../components/gallery/GalleryVideo.vue';
import GalleryAudio from '../components/gallery/GalleryAudio.vue';

const components = ref({
  image: markRaw(GalleryImage),
  video: markRaw(GalleryVideo),
  audio: markRaw(GalleryAudio)
});

const galleries = ref([
  {
    id: 1,
    title: 'Beispielgalerie A',
    description: 'Ein kurzer Beschreibungstext',
    items: [
      { type: 'image', src: 'https://unsplash.it/640/425?hash=a1', description: "Der Beschreibungstext zum Bild"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=b1', description: "Der Beschreibungstext zum Bild"},
      { type: 'audio', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', description: "Eine fröhliche Melodie"},
      { type: 'audio', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', description: "Ein ruhiges Klavierstück"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=c1', description: "Der Beschreibungstext zum Bild"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=d1', description: "Der Beschreibungstext zum Bild"},
      { type: 'video', src: 'https://www.youtube.com/embed/EkhFza9IhrM?controls=0', description: "Der Beschreibungstext zum Video"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=f1', description: "Der Beschreibungstext zum Bild"},
      { type: 'audio', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', description: "Ein spannender Soundtrack"},
      { type: 'audio', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', description: "Ein treibender Beat"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=g1', description: "Der Beschreibungstext zum Bild"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=h1', description: "Der Beschreibungstext zum Bild"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=i1', description: "Der Beschreibungstext zum Bild"},
      { type: 'video', src: 'https://www.youtube.com/embed/EkhFza9IhrM?controls=0', description: "Der Beschreibungstext zum Video"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=k1', description: "Der Beschreibungstext zum Bild"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=l1', description: "Der Beschreibungstext zum Bild"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=m1', description: "Der Beschreibungstext zum Bild"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=n1', description: "Der Beschreibungstext zum Bild"},
    ]
  },
  {
    id: 2,
    title: 'Beispielgalerie B',
    description: 'Ein anderer Beschreibungstext',
    items: [
      { type: 'image', src: 'https://unsplash.it/640/425?hash=a2', description: "Der Beschreibungstext zum Bild"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=b2', description: "Der Beschreibungstext zum Bild"},
      { type: 'audio', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', description: "Naturgeräusche: sanfter Regen"},
      { type: 'audio', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3', description: "Ein kurzes Gitarrenriff"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=c2', description: "Der Beschreibungstext zum Bild"},
      { type: 'video', src: 'https://www.youtube.com/embed/EkhFza9IhrM?controls=0', description: "Der Beschreibungstext zum Video"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=e2', description: "Der Beschreibungstext zum Bild"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=f2', description: "Der Beschreibungstext zum Bild"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=g2', description: "Der Beschreibungstext zum Bild"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=h2', description: "Der Beschreibungstext zum Bild"},
      { type: 'audio', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3', description: "Ein lustiges Geräusch"},
      { type: 'audio', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3', description: "Eine entspannende Melodie"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=i2', description: "Der Beschreibungstext zum Bild"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=j2', description: "Der Beschreibungstext zum Bild"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=k2', description: "Der Beschreibungstext zum Bild"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=l2', description: "Der Beschreibungstext zum Bild"},
      { type: 'video', src: 'https://www.youtube.com/embed/EkhFza9IhrM?controls=0', description: "Der Beschreibungstext zum Video"},
      { type: 'image', src: 'https://unsplash.it/640/425?hash=n2', description: "Der Beschreibungstext zum Bild"},
    ]
  }
])
</script>

<template>
  <div class="container">
    <Gallery 
      v-for="gallery in galleries" 
      :key="gallery.id" 
      :title="gallery.title"
      :description="gallery.description"
    >
      <component
        v-for="item in gallery.items"
        :key="item.src"
        :is="components[item.type]"
        :src="item.src"
        :description="item.description"
        :title="gallery.title"
      />
    </Gallery>
  </div>
</template>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.gallery + .gallery {
  margin-top: 4rem;
}
</style>