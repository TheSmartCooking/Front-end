<template>
    <div>
        <p>Nothing to see here.</p>
        <ButtonHome />
    </div>
</template>

<script setup>
import ButtonHome from '~/components/ButtonHome.vue'
</script>

<style scoped>
div {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-medium);
    height: 100%;
    justify-content: center;
}
</style>
