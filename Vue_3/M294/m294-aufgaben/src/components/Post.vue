<script setup>
const props = defineProps({
  id: {
    type: Number,
    required: true},
  title: {
    type: String,
    required: true},
  text: {
    type: String,
    required: true},
  user: {
    type: String,
    required: true},
  votes: {
    type: Number,
    required: true}
});

const emit = defineEmits(['vote-up', 'vote-down']);

function handleVoteUp() {
  emit('vote-up', props.id);
}

function handleVoteDown() {
  emit('vote-down', props.id);
}

</script>

<template>
  <div class="post">
    <div class="post__votes voter">
      <button @click="handleVoteUp" class="voter__action">
        👍
      </button>
      <div class="voter__votes">
        {{ votes }}
      </div>
      <button @click="handleVoteDown" class="voter__action">
        👎
      </button>
    </div>
    <div class="post__content">
      <div class="post__user">
        von {{ user }}
      </div>
      <div class="post__title">
        {{ title }}
      </div>
      <div class="post__text">
        {{ text }}
      </div>
    </div>
  </div>
</template>

<style>
.post {
  display: flex;
  padding: 20px;
  border: 2px solid transparent;
  border-radius: 8px;
  margin: 10px 0;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.post:hover {
  box-shadow: 0 3px 8px rgba(0,0,0,0.15);
}

.post--trending {
  border: 2px dashed #ecc500;
  background: #fff8ee;
}

.post--spam {
  opacity: .25;
}

.post + .post {
  border-top: 1px solid #f0f0f0;
}

.post__user {
  font-size: .9rem;
  color: #666;
  margin-bottom: 10px;
}

.post__title {
  font-size: 1.1rem;
  line-height: 1.3;
  font-weight: bold;
  margin-bottom: 10px;
}

.post__text {
  color: #666;
  line-height: 1.4;
  font-size: .9rem;
}

.post__content {
  flex: 1;
}

.post__votes {
  width: 50px;
  margin-right: 20px;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
}

.voter__votes {
  font-size: 1.3rem;
  font-weight: bold;
  margin: 8px 0;
  transition: color 0.2s ease;
}

.voter__votes--positive {
  color: #4caf50;
}

.voter__votes--negative {
  color: #f44336;
}

.voter__action {
  appearance: none;
  background: #f5f5f5;
  font-weight: bold;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all .2s ease;
  width: 36px;
  height: 36px;
  border-radius: 100%;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}

.voter__action--up:hover {
  background: #e8f5e9;
  transform: translateY(-2px);
}

.voter__action--down:hover {
  background: #ffebee;
  transform: translateY(2px);
}

.voter__action:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
}
</style>