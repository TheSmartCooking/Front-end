<template>
    <div class="layout">
        <Header />
        <NuxtPage />
        <Footer />
        <LoadingSpinner />
    </div>
</template>

<script setup lang="ts">
const router = useRouter()

const nav = [
    { label: 'Home', to: '/' },
    { label: 'Account', to: '/account' },
    { label: 'Contact', to: '/contact' },
];
</script>

<style scoped>
.layout {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-large);
    height: 100svh;
    justify-content: center;
    width: 100%;
}

.layout > :nth-child(2) {
    flex: 1;
}
</style>
