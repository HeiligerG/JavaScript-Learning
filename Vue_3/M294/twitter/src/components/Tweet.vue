<script setup>
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
const defineProps =  defineProps({
    user: {
      Object,
      required: true,
    },
    text: {
      String,
      required: true,
    },
    createdAt: {
      String,
      required: true,
    }
})

</script>

<template>
    <!-- Tweet -->
    <div class="tweet">
            <div class="tweet__avatar">
              <img :src="`https://i.pravatar.cc/100?u=${user.id}`" alt=""/>
            </div>
            <div class="tweet__content">
              <div class="tweet__header">
                <span class="tweet__author">{{ user.name }}</span>
                <span class="tweet__timestamp">
                  {{ (new Date() - new Date(createdAt)) < 3600000
                    ? formatDistance(new Date(createdAt), new Date(), { addSuffix: true, unit: 'minute' })
                    : formatDistance(new Date(createdAt), new Date(), { addSuffix: true }) }}
                </span>
              </div>
              <div class="tweet__text">
                {{ text }}
              </div>
            </div>
          </div>
</template>

<style>
</style>