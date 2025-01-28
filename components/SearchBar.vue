<template>
    <input type="text" v-model="search" @input="onInput" placeholder="Search for recipes" />
</template>

<script setup>
import { ref } from "vue";

const search = ref("");
const emit = defineEmits(["search"]);

// Debounce logic
let debounceTimeout = null;
function onInput() {
    clearTimeout(debounceTimeout);

    debounceTimeout = setTimeout(() => {
        emit("search", search.value.trim());
    }, 750);
}
</script>

<style scoped>
input {
    width: 100%;
    max-width: calc(var(--polaroid-width) - var(--spacing-small) * 2);
    padding: var(--spacing-small);
    border: 1px solid var(--color-secondary);
    border-radius: var(--border-radius-small);
    font-size: var(--font-size-title);
}
</style>
