<script setup>
import { faker } from '@faker-js/faker'
import { ref } from 'vue'
import Post from '../components/Post.vue'

const posts = ref([
  { id: 1, title: faker.lorem.words(10), text: faker.lorem.paragraph(), user: faker.internet.username(), votes: 8 },
  { id: 2, title: faker.lorem.words(10), text: faker.lorem.paragraph(), user: faker.internet.username(), votes: 0 },
  { id: 3, title: faker.lorem.words(10), text: faker.lorem.paragraph(), user: faker.internet.username(), votes: -4 },
  { id: 4, title: faker.lorem.words(10), text: faker.lorem.paragraph(), user: faker.internet.username(), votes: 0 },
  { id: 5, title: faker.lorem.words(10), text: faker.lorem.paragraph(), user: faker.internet.username(), votes: -8 },
  { id: 6, title: faker.lorem.words(10), text: faker.lorem.paragraph(), user: faker.internet.username(), votes: 4 },
  { id: 7, title: faker.lorem.words(10), text: faker.lorem.paragraph(), user: faker.internet.username(), votes: 6 },
  { id: 8, title: faker.lorem.words(10), text: faker.lorem.paragraph(), user: faker.internet.username(), votes: 3 },
  { id: 9, title: faker.lorem.words(10), text: faker.lorem.paragraph(), user: faker.internet.username(), votes: 15 },
])

function voteUp(id) {
  const post = posts.value.find(post => post.id === id)
  if (post) {
    post.votes++
  }
}

function voteDown(id) {
  const post = posts.value.find(post => post.id === id)
  if (post) {
    post.votes--
  }
}

</script>

<template>
  <div class="container">
    <Post
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :title="post.title"
        :text="post.text"
        :user="post.user"
        :votes="post.votes"
        @vote-up="voteUp"
        @vote-down="voteDown"
    />
  </div>
</template>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  font-size: 16px;
  background: #f5f7fa;
  color: #333;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.container {
  max-width: 800px;
  margin: 40px auto;
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .08);
  background: #fff;
  border-radius: 8px;
  position: relative;
  overflow: hidden;
}

.header {
  background: #4a5568;
  color: white;
  padding: 20px 30px;
  text-align: center;
}

.header h1 {
  margin: 0;
  font-weight: 600;
  font-size: 1.8rem;
}

.header__subtitle {
  margin-top: 5px;
  opacity: 0.8;
  font-size: 0.9rem;
}

.posts-container {
  padding: 10px 20px;
}

@media (max-width: 600px) {
  .container {
    margin: 0;
    border-radius: 0;
  }
  
  .header {
    padding: 15px;
  }
  
  .header h1 {
    font-size: 1.5rem;
  }
}
</style>