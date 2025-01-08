<template>
    <footer>{{ appTitle }} {{ yearString }} All rights reserved</footer>
</template>

<script setup>
import { computed } from 'vue';

const { public: { appTitle } } = useRuntimeConfig();

// Define the base year
const baseYear = 2024;

// Compute the dynamic year string
const yearString = computed(() => {
    const currentYear = new Date().getFullYear();
    return currentYear === baseYear ? baseYear.toString() : `${baseYear}-${currentYear}`;
});
</script>

<style scoped>
footer {
    color: var(--color-secondary);
}
</style>
