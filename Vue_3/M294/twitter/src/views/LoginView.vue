<script setup>
import { ref, computed } from 'vue';

const email = ref('');
const password = ref('');

const isLoginButtonDisabled = computed(() => {
  return !email.value || !password.value;
});
</script>

<template>
  <div class="login">
    <section class="login-wrapper">
      <form action="#" class="login-form" autocomplete="off" novalidate>
        <div class="form-group">
          <label class="form-label" for="email">E-Mail</label>
          <input v-model="email" class="form-input" type="email" id="email" />
          <div class="form-error">
            Ungültige E-Mail
          </div>
        </div>
        <div class="form-group">
          <label class="form-label" for="password">Passwort</label>
          <input v-model="password" class="form-input" type="password" id="password" />
          <div class="form-error">
            Falsches Passwort
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

