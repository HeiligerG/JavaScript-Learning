<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  teaser: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  numberOfWords: {
    type: Number,
    required: true
  }
})

const readingTime = Math.round(props.numberOfWords / 300) || 1;
const readingTimeText = readingTime === 1 ? '1 Minute Lesezeit' : `${readingTime} Minuten Lesezeit`;
</script>

<template>
  <div class="newsfeed__item">
    <div class="newsfeed__image">
      <img :src="image" alt="">
    </div>
    <div class="newsfeed__text">
      <h2 class="newsfeed__heading">
        {{ title }}
      </h2>
      <p class="newsfeed__teaser">
        {{ teaser }}
      </p>
      <p class="newsfeed__meta">
        {{ readingTimeText }}
      </p>
    </div>
  </div>
</template>

<style>
.newsfeed__image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.newsfeed__text {
  padding: 20px;
}

.newsfeed__item {
  display: grid;
  grid-template-columns: 200px auto;
}

.newsfeed__heading {
  font-size: 18px;
  margin: 10px 0;
}

.newsfeed__teaser {
  font-size: 15px;
  line-height: 1.25;
}

.newsfeed__meta {
  font-size: 15px;
  line-height: 1.25;
  color: rgba(255, 255, 255, .6);
}

.newsfeed__item + .newsfeed__item {
  border-top: 1px solid hsla(0,0%,100%,.05);
}
</style>