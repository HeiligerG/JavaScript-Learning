<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    }
});
</script>

<template>
    <!-- Top User Widget -->
    <section class="widget">
          <h2 class="widget__heading">
            {{ title }}
          </h2>
        <slot />
    </section>
</template>

<style>
</style>