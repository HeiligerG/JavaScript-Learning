<script setup>
import { ref } from 'vue'
import NewsfeedItem from '../components/NewsfeedItem.vue'

const items = ref([
  { 
    id: 1,
    title: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr', 
    teaser: 'At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    numberOfWords: 512,
    image: 'https://placecats.com/millie_neo/200/200',
  },
  { 
    id: 2,
    title: 'At vero eos et accusam et justo duo', 
    teaser: 'Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren.',
    numberOfWords: 1723,
    image: 'https://placecats.com/neo_banana/200/200',
  },
  { 
    id: 3,
    title: 'Consetetur sadipscing elitr, sed diam nonumy eirmod tempor ', 
    teaser: 'labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
    numberOfWords: 821,
    image: 'https://placecats.com/bella/200/200',
  },
])
</script>

<template>  
  <div class="box">
    <div class="newsfeed">
      <NewsfeedItem 
        v-for="item in items" 
        :key="item.id"
        :title="item.title"
        :teaser="item.teaser"
        :image="item.image"
        :number-of-words="item.numberOfWords"
      />
    </div>
  </div>
</template>

<style>
.box {
  box-shadow: inset 0 1px 0 0 hsla(0,0%,100%,.05);
  background: rgb(129, 160, 208);
  border-radius: 5px;
  overflow: hidden;
}

.newsfeed {
  margin: 0;
  padding: 0;
}
</style>