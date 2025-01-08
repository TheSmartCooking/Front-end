<template>
    <header>
        <span>{{ appTitle }}</span>
        <ul>
            <li><nuxt-link to="/" title="Home"><IconHome /></nuxt-link></li>
            <li v-if="isLoggedIn"><nuxt-link to="/account" title="Account"><IconAccount /></nuxt-link></li>
            <li v-else><nuxt-link to="/login" title="Login"><IconAccount /></nuxt-link></li>
            <li><nuxt-link to="/contact" title="Contact Us"><IconContact /></nuxt-link></li>
        </ul>
    </header>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useCookie } from '#app';
import IconHome from '@/assets/icons/home.svg';
import IconAccount from '@/assets/icons/user.svg';
import IconContact from '@/assets/icons/mail-question.svg';

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
    background-color: var(--color-quinary);
    display: flex;
    justify-content: space-between;
    width: 100%;
}

span {
    color: var(--color-secondary);
    font-size: var(--font-size-heading);
    font-weight: bold;
    margin-left: var(--spacing-medium);
}

ul {
    align-items: center;
    display: flex;
    gap: var(--spacing-medium);
    list-style-type: none;
    margin-right: var(--spacing-medium);
}

li svg {
    height: var(--icon-size);
    stroke: var(--color-primary);
    width: var(--icon-size);
    cursor: pointer;
}
</style>
