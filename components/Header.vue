<template>
  <header>
    <span v-html="appTitle"></span>
    <ul>
      <li><nuxt-link to="/">Home</nuxt-link></li>
      <li v-if="isLoggedIn"><nuxt-link to="/account">Account</nuxt-link></li>
      <li v-else><nuxt-link to="/login">Login</nuxt-link></li>
      <li><nuxt-link to="/contact">Contact</nuxt-link></li>
    </ul>
  </header>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useCookie } from '#app';

const { public: { appTitle } } = useRuntimeConfig();
const isLoggedIn = ref(false);

// Monitor the refresh_token cookie
const userCookie = useCookie('refresh_token');

// Update isLoggedIn when the cookie changes
watchEffect(() => {
    isLoggedIn.value = !!userCookie.value;
});

// Ensure the header reacts to route changes
const router = useRouter();
router.afterEach(() => {
    isLoggedIn.value = !!userCookie.value;
});
</script>

<style scoped>
header {
    background-color: rgb(0 0 0 / 30%);
    display: flex;
    justify-content: space-between;
    width: 100%;
}

span {
    font-size: var(--font-size-heading);
}

ul {
    align-items: center;
    display: flex;
    gap: var(--spacing-medium);
    justify-content: center;
    list-style-type: none;
    padding: 0;
}
</style>
