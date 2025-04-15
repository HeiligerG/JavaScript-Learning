<script setup>
import { ref, computed } from 'vue';
import { loginUser } from '../api/requests.js'
import { useRouter } from 'vue-router'

const email = ref('');
const password = ref('');
const router = useRouter()

const isLoginButtonDisabled = computed(() => {
  return !email.value || !password.value;
});

const errors = ref({
  email: '',
  password: '',
})

async function login () {
  try {
    await loginUser(email.value, password.value)
    await router.push('/')
  } catch (exception) {
    console.error('login error', exception)

    errors.value = exception.errors
  }
}
</script>

<template>
  <div class="login">
    <section class="login-wrapper">
      <form action="#" class="login-form" @submit.prevent="login" autocomplete="off" novalidate>
        <div class="form-group">
          <label class="form-label" for="email">E-Mail</label>
          <input v-model="email" class="form-input" type="email" id="email" />
          <div class="form-error" v-if="errors.email">
            {{ errors.email}}
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="password">Passwort</label>
          <input v-model="password" class="form-input" type="password" id="password" />
          <div class="form-error" v-if="errors.password">
          {{ errors.password }}
        </div>
  </div>
  <div class="form-group">
    <button :disabled="isLoginButtonDisabled" class="btn btn--primary btn--block">
      Login
    </button>
  </div>
  </form>
  </section>
  </div>
</template>

