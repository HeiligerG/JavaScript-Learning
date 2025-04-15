<script setup>
import { RouterLink } from 'vue-router';
import IconHome from './icons/IconHome.vue'
import IconLogin from './icons/IconLogin.vue'
import { useAuth } from '../api/auth'

const { isLoggedIn, logout } = useAuth()

</script>

<template>
  <nav class="nav">
    <RouterLink to="/">
      <IconHome />
      Home
    </RouterLink>
    <RouterLink to="/stream">
      Stream
    </RouterLink>
    <RouterLink to="/login" v-if="!isLoggedIn">
      <IconLogin />
      Login
    </RouterLink>
    <a href="#" @click="logout" v-if="isLoggedIn" class="logout-link">
      <IconLogin />
      Logout
    </a>
  </nav>
</template>

<style>
</style>