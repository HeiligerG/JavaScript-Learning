<script setup>
import LoginInfo from '../components/LoginInfo.vue'
import Composer from '../components/Composer.vue'
import Tweet from '../components/Tweet.vue'
import { onMounted, ref } from 'vue'
import { fetchStream } from '../api/requests'

const loading = ref(true)
const tweets = ref([])

onMounted(() => {
    console.log('HomeView mounted')
})

onMounted(async () => {
    console.log('HomeView mounted')
    setTimeout(() => {
        loading.value = false
    }, 3000)
})

onMounted(async () => {
    loading.value = true
    try {
        const stream = await fetchStream()
        
        tweets.value = stream
    } catch (error) {
        console.error(error)
    } finally {
        loading.value = false
    }
})
</script>

<template>
<LoginInfo></LoginInfo>

<Composer></Composer>

<!-- Stream -->
<section class="stream">
    <div v-if="loading" class="loading">
      Lade Tweets...
    </div>
    <Tweet
      v-if="!loading"
      v-for="tweet in tweets"
      :key="tweet.id"
      :user="tweet.user"
      :text="tweet.text"
      :created-at="tweet.createdAt"
    />
</section>
</template>

<style>
</style>