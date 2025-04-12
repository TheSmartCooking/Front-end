<template>
    <footer>
        <span>{{ appTitle }} {{ yearString }}</span>
        <span>All rights reserved</span>
    </footer>
</template>

<script setup>
import { computed } from 'vue'

const {
    public: { appTitle },
} = useRuntimeConfig()

// Define the base year
const baseYear = 2024

// Compute the dynamic year string
const yearString = computed(() => {
    const currentYear = new Date().getFullYear()
    return currentYear === baseYear
        ? baseYear.toString()
        : `${baseYear}-${currentYear}`
})
</script>

<style scoped>
footer {
    align-self: center;
    color: light-dark(#000, #fff);
    display: flex;
    gap: var(--spacing-small);
}

@media screen and (width<=850px) {
    footer {
        flex-direction: column;
        font-size: 1rem;
        gap: 0;
        text-align: center;
    }
}
</style>
