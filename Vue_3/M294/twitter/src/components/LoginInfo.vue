<script setup>
import { RouterLink } from 'vue-router';
import IconSparkles from './icons/IconSparkles.vue'
</script>

<template>
    <!-- Login Info -->
    <section class="login-info">
        <div class="login-info__icon">
            <IconSparkles />
        </div>
        <div class="login-info__content">
            <h2 class="login-info__heading">
                Du bist nicht angemeldet
            </h2>
            <div class="login-info__action">
                <RouterLink to="/login" class="btn btn--transparent">
                    Zum Login &nbsp; &rarr;
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<style>
</style>