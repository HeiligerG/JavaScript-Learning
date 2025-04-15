<script setup>
import { ref } from "vue";
import { createTweet } from "./../api/requests";

const emit = defineEmits(["posted"]);

const text = ref("");

function submit(event) {
  event.preventDefault();
  createTweet(text.value)
    .then(() => {
      emit("posted");
      text.value = ""
    })
    .catch((error) => {
      console.error("Fehler beim Posten des Tweets:", error);
    });
}
</script>

<template>
  <form class="composer" @submit="submit">
    <label class="composer__prompt">Was geht?</label>
    <textarea
      v-model="text"
      maxlength="160"
      class="composer__textarea"
      placeholder="Verfasse einen Tweet..."
    />
    <div class="composer__actions">
      <div class="composer__stats stats">
        <span class="stats__counter">{{ text.length }}</span>
        <span class="stats__max">/ 160</span>
      </div>
      <button :disabled="text.length < 5" class="btn btn--primary">
        Tweet veröffentlichen
      </button>
    </div>
  </form>
</template>