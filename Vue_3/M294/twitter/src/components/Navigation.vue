<script setup>
import { RouterLink } from 'vue-router';
import IconHome from './icons/IconHome.vue'
import IconLogin from './icons/IconLogin.vue'
</script>

<template>
    <!-- Navigation -->
    <nav class="nav">
        <RouterLink to="/">
            <IconHome />
            Home
        </RouterLink>
        Stream
        <RouterLink to="/login">
            <IconLogin />
            Login
        </RouterLink>
    </nav>
</template>

<style>
</style>