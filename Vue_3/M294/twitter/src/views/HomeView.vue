<script setup>
import Tweet from "../components/Tweet.vue";
import Composer from "../components/Composer.vue";
import LoginInfo from "../components/LoginInfo.vue";
import { fetchStream } from "../api/requests";
import { onMounted, ref } from "vue";
import { checkAuth } from "../api/requests";
import { useAuth } from "../api/auth";

const loading = ref(true);
const tweets = ref([]);

const { isLoggedIn } = useAuth();

onMounted(async () => {
  loadTweets();
});

async function loadTweets() {
  const response = await checkAuth();
  console.log("checkAuth Resultat", response);
  loading.value = true;
  try {
    const stream = await fetchStream();

    tweets.value = stream;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <LoginInfo v-if="!isLoggedIn" />
  <Composer v-if="isLoggedIn" @posted="loadTweets" />
  <section class="stream" v-if="!loading">
    <Tweet
      v-for="tweet in tweets"
      :key="tweet.id"
      :user="tweet.user"
      :text="tweet.text"
      :created-at="tweet.created_at"
    />
  </section>
  <div class="loading" v-else>Lade Tweets...</div>
</template>