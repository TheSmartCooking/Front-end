<template>
    <div v-if="isLoggedIn">
        <h1>TODO: New recipe page.</h1>
    </div>
    <div v-else>
        <p>Please log in to create a new recipe.</p>
        <nuxt-link to="/login">Login</nuxt-link>
    </div>
</template>

<script setup>
import { useAuth } from '@/composables/useAuth'

const { isLoggedIn } = useAuth()
</script>

<style scoped>
div {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-medium);
    justify-content: center;
}
</style>
