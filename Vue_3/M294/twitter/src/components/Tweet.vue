<script setup>
import { ref } from 'vue';
import { formatDistance } from 'date-fns';
import { likeTweet } from './../api/requests.js';
import { useRouter } from 'vue-router';
import { useAuth } from './../api/auth.js';

const props = defineProps({
  tweetId: {
    type: Number,
    required: true,
  },
  user: {
    type: Object,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  isLikedByUser: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();
const { isLoggedIn } = useAuth();
const likesCount = ref(props.likes);
const isLiked = ref(props.isLikedByUser);

const handleLike = async () => {
  if (!isLoggedIn.value) {
    router.push({ name: 'Login' });
    return;
  }

  if (isLiked.value) {
    return;
  }

  try {
    await likeTweet(props.tweetId);
    likesCount.value += 1;
    isLiked.value = true;
  } catch (error) {
    console.error('Error liking tweet:', error);
  }
};
</script>

<template>
  <div class="tweet">
    <div class="tweet__avatar">
      <img :src="`https://i.pravatar.cc/100?u=${user.id}`" alt="Avatar" />
    </div>
    <div class="tweet__content">
      <div class="tweet__header">
        <span class="tweet__author">{{ user.name }}</span>
        <span class="tweet__timestamp">
          {{ formatDistance(new Date(createdAt), new Date(), { addSuffix: true }) }}
        </span>
      </div>
      <div class="tweet__text">
        {{ text }}
      </div>
    </div>
    <div class="tweet__actions">
      <button @click="handleLike" class="like__button" :class="{ 'like__button--liked': isLiked }">
        <span v-if="isLiked">❤️</span>
        <span v-else>🤍</span>
      </button>
      <span class="like__amount">{{ likesCount }}</span>
    </div>
  </div>
</template>

<style>
.tweet {
  border-bottom: 1px solid #e6ecf0;
  padding: 15px;
  display: flex;
}

.tweet__avatar {
  margin-right: 10px;
}

.tweet__avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.tweet__content {
  flex: 1;
}

.tweet__header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.tweet__author {
  font-weight: bold;
  margin-right: 5px;
}

.tweet__timestamp {
  color: #657786;
  font-size: 0.9em;
}

.tweet__text {
  margin-bottom: 10px;
  line-height: 1.4;
}

.tweet__actions {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.like__button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  font-size: 1.2em;
  transition: all 0.2s;
}

.like__button:hover {
  transform: scale(1.1);
}

.like__button--liked {
  color: #e0245e;
}

.like__amount {
  margin-left: 5px;
  font-size: 0.9em;
  color: #657786;
}
</style>