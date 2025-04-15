<script setup>
import Widget from './Widget.vue';
import { fetchTopUsers } from '../api/requests.js'
import { ref, onMounted } from 'vue';

const topUsers = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    topUsers.value = await fetchTopUsers();
  } catch (error) {
    console.error('Error fetching top users:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <Widget title="Top User">
    <div v-if="loading" class="loading">
      Lade Top User...
    </div>
    <ul v-else class="content-list">
      <li class="content-list__item" v-for="user in topUsers" :key="user.id">
        <a href="#">
          <span class="content-list__meta">
            {{ user.tweets_count }}
          </span>
          <span class="content-list__text">
            {{ user.name }}
          </span>
        </a>
      </li>
    </ul>
  </Widget>
</template>

<style>
.loading {
  padding: 1rem;
  text-align: center;
}
</style>