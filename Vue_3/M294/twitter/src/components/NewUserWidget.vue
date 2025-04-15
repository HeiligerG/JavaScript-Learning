<script setup>
import Widget from './Widget.vue';
import { fetchNewUsers } from '../api/requests.js'
import { ref, onMounted } from 'vue';

const newUsers = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    newUsers.value = await fetchNewUsers();
  } catch (error) {
    console.error('Error fetching top users:', error);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <Widget title="New User">
    <div v-if="loading" class="loading">
      Lade New User...
    </div>
    <ul v-else class="content-list">
      <li class="content-list__item" v-for="user in newUsers" :key="user.id">
        <a href="#">
          <span class="content-list__meta">
            {{ new Date(user.created_at).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) }} {{ new Date(user.created_at).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', hour12: false }) }}
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