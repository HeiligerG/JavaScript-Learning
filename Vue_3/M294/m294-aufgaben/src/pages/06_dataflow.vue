<script setup>
import { faker } from '@faker-js/faker'
import { ref } from 'vue'
import Post from '../components/Post.vue'

const posts = ref([
  { id: 1, title: faker.lorem.words(10), text: faker.lorem.paragraph(), user: faker.internet.userName(), votes: 8 },
  { id: 2, title: faker.lorem.words(10), text: faker.lorem.paragraph(), user: faker.internet.userName(), votes: 0 },
  { id: 3, title: faker.lorem.words(10), text: faker.lorem.paragraph(), user: faker.internet.userName(), votes: -4 },
  { id: 4, title: faker.lorem.words(10), text: faker.lorem.paragraph(), user: faker.internet.userName(), votes: 0 },
  { id: 5, title: faker.lorem.words(10), text: faker.lorem.paragraph(), user: faker.internet.userName(), votes: -8 },
  { id: 6, title: faker.lorem.words(10), text: faker.lorem.paragraph(), user: faker.internet.userName(), votes: 4 },
  { id: 7, title: faker.lorem.words(10), text: faker.lorem.paragraph(), user: faker.internet.userName(), votes: 6 },
  { id: 8, title: faker.lorem.words(10), text: faker.lorem.paragraph(), user: faker.internet.userName(), votes: 3 },
  { id: 9, title: faker.lorem.words(10), text: faker.lorem.paragraph(), user: faker.internet.userName(), votes: 15 },
])

const postsMap = new Map(posts.value.map(post => [post.id, post]))

function voteUp(id) {
  const post = postsMap.get(id)
  return post.votes += 1
}

function voteDown(id) {
  const post = postsMap.get(id)
  return post.votes -= 1
}

</script>

<template>
  <div class="container">
    <Post
        v-for="Post in posts"
        :key="Post.id"
        :id="Post.id"
        :title="Post.title"
        :text="Post.text"
        :user="Post.user"
        :votes="Post.votes"
    />
  </div>
</template>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  font-size: 16px;
  background: #f0f0f0;
}

.container {
  max-width: 800px;
  margin: 40px auto;
  border: 1px solid #fafafa;
  box-shadow: 0 0 2px rgba(0, 0, 0, .2);
  background: #fff;
  border-radius: 4px;
  position: relative;
}
</style>